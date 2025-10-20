import { File } from '@/database/entities/file.entity';
import { ProductVariant } from '@/database/entities/product-variant.entity';
import { Quotation } from '@/database/entities/quotation.entity';
import { ProductItemType } from '@/shared/enums/product.enum';
import { QuotationStatus } from '@/shared/enums/quotation.enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { GraphQLError } from 'graphql';
import { keyBy } from 'lodash';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import {
  Between,
  DataSource,
  FindManyOptions,
  In,
  Like,
  QueryRunner,
  Repository,
} from 'typeorm';
import { CreateQuotationInput } from './input/create-quotation.input';
import { SearchQuotationArgs } from './input/search-quotation.agrs';
import { UpdateQuotationInput } from './input/update-quotation.input';

interface TransactionCallback<T> {
  (queryRunner: QueryRunner): Promise<T>;
}

@Injectable()
export class QuotationsService {
  constructor(
    @InjectRepository(Quotation)
    private quotationRepository: Repository<Quotation>,
    @InjectRepository(ProductVariant)
    private readonly productVariantRepository: Repository<ProductVariant>,

    @InjectDataSource()
    private readonly dataSource: DataSource,

    private readonly configService: ConfigService,
  ) {}

  /**
   * Base transaction method to handle common transaction operations
   */
  private async executeTransaction<T>(
    callback: TransactionCallback<T>,
  ): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await callback(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new GraphQLError(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  private async validateStockAvailability(
    queryRunner: QueryRunner,
    quotation: Quotation,
  ): Promise<void> {
    const variants = quotation.items.map((item) => ({
      quantity: item.quantity,
      productVariantId: item.productVariantId,
    }));

    if (variants.length === 0) {
      return;
    }

    const products = await queryRunner.manager
      .getRepository(ProductVariant)
      .find({
        where: { id: In(variants.map((variant) => variant.productVariantId)) },
        select: {
          id: true,
          stock: true,
          sku: true,
          product: {
            name: true,
            description: true,
          },
        },
        relations: {
          product: true,
        },
      });

    const productById = keyBy(products, 'id');

    const unavailableItems: string[] = [];

    for (const variant of variants) {
      const product = productById[variant.productVariantId];

      if (!product) {
        throw new Error('ไม่พอข้อมูลสินค้าที่เลือก กรุณาติดต่อแอดมิน');
      }

      if (product.stock < variant.quantity) {
        unavailableItems.push(
          `${product.product.name} (SKU: ${product.sku}) - มีสต็อกเพียง ${product.stock} แต่ต้องการ ${variant.quantity}`,
        );
      }
    }

    if (unavailableItems.length > 0) {
      throw new Error(
        `สินค้าบางรายการมี stock ไม่เพียงพอ:\n${unavailableItems.join('\n')}`,
      );
    }

    for (const variant of variants) {
      await queryRunner.manager
        .getRepository(ProductVariant)
        .decrement({ id: variant.productVariantId }, 'stock', variant.quantity);
    }
  }

  async generateCode() {
    const today = dayjs();
    const year = today.format('YY');
    const month = today.format('MM');
    const count = await this.quotationRepository.count({
      where: {
        createdAt: Between(
          today.startOf('month').toDate(),
          today.endOf('month').toDate(),
        ),
      },
      withDeleted: true,
    });

    const current = `000${count + 1}`;
    const code = `Q-${year}${month}-${current.slice(-4)}`;

    return code;
  }

  async create(createQuotationInput: CreateQuotationInput, userId: string) {
    return this.executeTransaction(async (queryRunner) => {
      const code = await this.generateCode();

      // Check stock availability for product variants

      const quotation = await queryRunner.manager
        .getRepository(Quotation)
        .save({
          ...createQuotationInput,
          code,
          createdBy: userId,
          updatedBy: userId,
          items: createQuotationInput.items.map((item) => ({
            productId:
              item.productType === ProductItemType.PACKAGE
                ? item.productId
                : null,
            productVariantId:
              item.productType === ProductItemType.PRODUCT
                ? item.productId
                : null,
            productName: item.productName,
            productDescription: item.productDescription,
            productType: item.productType,
            quantity: item.quantity,
            specialPrice: item.specialPrice,
            price: item.price,
            createdBy: userId,
            updatedBy: userId,
            items: item?.items?.map((packageItem) => ({
              packageItemId: packageItem.packageItemId,
              productVariantId: packageItem.productId,
              productType: packageItem.productType,
              productName: packageItem.productName,
              productDescription: packageItem.productDescription,
              quantity: packageItem.quantity,
              specialPrice: packageItem.specialPrice,
              price: packageItem.price,
              createdBy: userId,
              updatedBy: userId,
            })),
          })),
          promotions: createQuotationInput?.promotions?.map((promotion) => ({
            promotionId: promotion.promotionId,
            code: promotion.code,
            kind: promotion.kind,
            type: promotion.type,
            name: promotion.name,
            description: promotion.description,
            value: promotion.value,
            createdBy: userId,
            updatedBy: userId,
          })),
        });

      if (createQuotationInput.signatureFile) {
        await queryRunner.manager.getRepository(File).save({
          ...createQuotationInput.signatureFile,
          fileBucket: this.configService.getOrThrow<string>('AWS_S3_BUCKET'),
          refId: quotation.id,
          createdBy: userId,
          updatedBy: userId,
        });
      }

      await this.validateStockAvailability(queryRunner, quotation);

      return quotation;
    });
  }

  async searchWithPaginate(args: SearchQuotationArgs) {
    const { page, limit, searchText } = args;

    const findOptions: FindManyOptions<Quotation> = {
      order: { updatedAt: 'DESC' },
    };

    if (searchText?.trim()) {
      const query = `%${searchText.trim()}%`;
      findOptions.where = [
        { code: Like(query) },
        { customerFirstName: Like(query) },
        { customerLastName: Like(query) },
        { customerPhone: Like(query) },
        { customerEmail: Like(query) },
        { unitId: Like(query) },
        { unitNumber: Like(query) },
      ];
    }

    return this.paginate({ page, limit }, findOptions);
  }

  async findAll() {
    return this.quotationRepository.find();
  }

  async findOne(id: string) {
    return this.quotationRepository.findOne({ where: { id } });
  }

  private async paginate(
    pageOptions: IPaginationOptions,
    findOptions?: FindManyOptions<Quotation>,
  ): Promise<Pagination<Quotation>> {
    return paginate<Quotation>(
      this.quotationRepository,
      pageOptions,
      findOptions,
    );
  }

  async update(
    id: string,
    updateQuotationInput: UpdateQuotationInput,
    userId: string,
  ) {
    const quotation = await this.quotationRepository.findOne({ where: { id } });

    if (!quotation) {
      throw new GraphQLError('ไม่พบใบเสนอราคา กรุณาตรวจสอบรหัสใบเสนอราคา');
    }

    await this.quotationRepository.update(id, {
      ...updateQuotationInput,
      updatedBy: userId,
    });

    return this.quotationRepository.findOne({ where: { id } });
  }

  async updateStatus(id: string, status: QuotationStatus, userId: string) {
    const quotation = await this.quotationRepository.findOne({ where: { id } });

    if (!quotation) {
      throw new GraphQLError('ไม่พบใบเสนอราคา กรุณาตรวจสอบรหัสใบเสนอราคา');
    }

    await this.quotationRepository.update(id, {
      status,
      updatedBy: userId,
    });

    return this.quotationRepository.findOne({ where: { id } });
  }

  async remove(id: string, userId: string) {
    const quotation = await this.quotationRepository.findOne({ where: { id } });

    if (!quotation) {
      throw new GraphQLError('ไม่พบใบเสนอราคา กรุณาตรวจสอบรหัสใบเสนอราคา');
    }

    await this.quotationRepository.update(id, {
      deletedBy: userId,
    });

    const deleted = await this.quotationRepository.softDelete(id);

    return !!deleted.affected;
  }

  async getQuotationWithIds(ids: readonly string[]) {
    const quotations = await this.quotationRepository.find({
      where: { id: In(ids) },
    });

    const key = keyBy(quotations, (quotation) => quotation.id);

    return ids.map((id) => key[id]);
  }
}
