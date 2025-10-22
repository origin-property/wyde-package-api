import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Like, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import {
  CreatePackageInput,
  PackageItemInput,
  UpdatePacakgeInput,
} from './input/create-package.input';

import {
  PackageItem as PackageItemEntity,
  PackageItemType,
} from '@/database/entities/package-item.entity';
import { ProductVariant as ProductVariantEntity } from '@/database/entities/product-variant.entity';
import { Product as ProductEntity } from '@/database/entities/product.entity';
import { FilesService } from '@/files/files.service';
import { UnitsService } from '@/projects/units.service';
import { ProductItemType } from '@/shared/enums/product.enum';
import dayjs from 'dayjs';
import { sumBy } from 'lodash';
import { ConfigService } from '@nestjs/config';
import { FindAllPackagesInput } from './input/find-all-products.input';
import { ProductType } from '@/database/entities/product-type.entity';

@Injectable()
export class PackagesService {
  buckketName: string;
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(ProductVariantEntity)
    private readonly variantRepository: Repository<ProductVariantEntity>,

    @InjectRepository(PackageItemEntity)
    private readonly packageItemRepository: Repository<PackageItemEntity>,

    private readonly unitService: UnitsService,

    private configService: ConfigService,
  ) {
    this.buckketName = this.configService.getOrThrow<string>('AWS_S3_BUCKET');
  }
  async create(
    createPackageInput: CreatePackageInput,
    userId: string,
  ): Promise<ProductEntity> {
    const { name, description, projectId, modelId, isActive, images, items } =
      createPackageInput;

    const defaultItems = items.filter(
      (i) => i.type === PackageItemType.DEFAULT,
    );
    const defaultItemIds = new Set(
      defaultItems.map((item) => item.productVariantId),
    );

    // ตรวจสอบว่า ProductVariant ที่อ้างอิงมีอยู่จริงหรือไม่
    const existingVariants = await this.checkExistingVariants(items);

    const totalDefaultProductPrice = sumBy(existingVariants, (variant) =>
      defaultItemIds.has(variant.id) ? Number(variant.sellingPrice) : 0,
    );

    const totalPackagePrice = sumBy(defaultItems, 'specialPrice');

    const newSku = await this.generateSKU();

    const productId = uuidv4();
    const variantId = uuidv4();

    const product = await this.productRepository.save({
      id: productId,
      name,
      description,
      createdBy: userId,
      updatedBy: userId,
      isActive,
      itemType: ProductItemType.PACKAGE,
      packageItems: items.map((item, idx) => ({
        ...item,
        seq: idx + 1,
        createdBy: userId,
        updatedBy: userId,
      })),
      packageDetail: {
        productId,
        projectId,
        modelId,
      },
      variants: [
        {
          id: variantId,
          sku: newSku,
          budgetPrice: totalDefaultProductPrice,
          sellingPrice: totalPackagePrice,
          stock: 0,
          images: images.map((img, idx) => ({
            ...img,
            fileBucket: this.buckketName,
            isMain: idx === 0,
            sortOrder: idx + 1,
            variantId,
            createdBy: userId,
            updatedBy: userId,
          })),
          createdBy: userId,
          updatedBy: userId,
          isActive: true,
        },
      ],
    });

    return product;
  }

  async update(
    input: UpdatePacakgeInput,
    userId: string,
  ): Promise<ProductEntity> {
    const { id, name, description, isActive, images, items } = input;

    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        packageItems: true,
        packageDetail: true,
        variants: { images: true },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const defaultItems = items.filter(
      (i) => i.type === PackageItemType.DEFAULT,
    );
    const defaultItemIds = new Set(
      defaultItems.map((item) => item.productVariantId),
    );

    const existingVariants = await this.checkExistingVariants(items);

    const totalDefaultProductPrice = sumBy(existingVariants, (variant) =>
      defaultItemIds.has(variant.id) ? Number(variant.sellingPrice) : 0,
    );

    const totalPackagePrice = sumBy(defaultItems, 'specialPrice');

    const updatedPackage = await this.productRepository.save({
      id,
      name,
      description,
      isActive,
      updatedBy: userId,
      variants: [
        {
          id: product.variants[0].id,
          budgetPrice: totalDefaultProductPrice,
          sellingPrice: totalPackagePrice,
          stock: 0,
          images: images.map((img) => ({
            ...img,
            fileBucket: this.buckketName,
            variantId: product.variants[0].id,
            updatedBy: userId,
          })),
          updatedBy: userId,
          isActive: true,
        },
      ],
      packageItems: items.map((item, idx) => ({
        ...item,
        seq: idx + 1,
        updatedBy: userId,
      })),
    });

    return updatedPackage;
  }

  async findAll(input: FindAllPackagesInput): Promise<ProductEntity[]> {
    const { projectId, modelId, searchText, page, limit } = input;

    const where: FindOptionsWhere<ProductEntity>[] = [];

    if (modelId && projectId) {
      where.push({
        packageDetail: {
          modelId,
          projectId,
        },
      });
    }

    if (projectId) {
      where.push({
        packageDetail: {
          projectId,
        },
      });
    }

    if (searchText && searchText.trim() !== '') {
      const query = `%${searchText.trim()}%`;
      where.push(
        {
          name: Like(query),
        },
        {
          variants: {
            sku: Like(query),
          },
        },
      );
    }

    return this.productRepository.find({
      where:
        where.length > 0
          ? where.map((w) => ({ ...w, itemType: ProductItemType.PACKAGE }))
          : [{ itemType: ProductItemType.PACKAGE }],
      relations: {
        variants: {
          images: true,
        },
        packageDetail: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findAllByUnitId(unitId: string): Promise<ProductEntity[]> {
    const unit = await this.unitService.findOne(unitId);

    if (!unit) {
      throw new NotFoundException('Unit not found');
    }

    return await this.productRepository.find({
      where: {
        itemType: ProductItemType.PACKAGE,
        packageDetail: { modelId: unit.modelId, projectId: unit.projectId },
      },
      relations: {
        packageDetail: true,
      },
    });
  }

  async getPackageItemByProductId(
    ids: readonly string[],
  ): Promise<PackageItemEntity[]> {
    return this.packageItemRepository.find({
      where: { productId: In(ids) },
      order: {
        seq: 'ASC',
      },
    });
  }

  private async generateSKU(): Promise<string> {
    const year = dayjs().format('YY');
    const month = dayjs().format('MM');

    const datePrefix = `${year}${month}`;

    const prefix = `PKG-${datePrefix}-`;

    const currentVariant = await this.variantRepository.findOne({
      where: {
        sku: Like(`${prefix}%`),
      },
      order: {
        createdAt: 'DESC',
      },
    });

    const currentSKU = currentVariant?.sku.split('-')[2] ?? '00000';
    const nextSKUNumber = parseInt(currentSKU) + 1;
    const nextSKU = nextSKUNumber.toString().padStart(5, '0');

    return `${prefix}${nextSKU}`;
  }

  private async checkExistingVariants(
    items: PackageItemInput[],
  ): Promise<ProductVariantEntity[] | undefined> {
    const variantIds = items.map((item) => item.productVariantId);
    const existingVariants = await this.variantRepository.find({
      where: { id: In(variantIds) },
      select: ['id', 'sellingPrice'],
    });

    const variantIdsNotFound = variantIds.filter(
      (id) => !existingVariants.some((v) => v.id === id),
    );

    if (variantIdsNotFound.length > 0) {
      throw new NotFoundException(
        `ProductVariants not found: ${variantIdsNotFound.join(', ')}`,
      );
    }

    return existingVariants;
  }
}
