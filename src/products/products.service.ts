import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
// import { UpdateProductInput } from './dto/update-product.input';
import { Product } from '../database/entities/product.entity';
import { ProductOption } from '../database/entities/product-option.entity';
import { ProductOptionValue } from '../database/entities/product-option-value.entity';
import { ProductVariant } from '../database/entities/product-variant.entity';
import { ProductVariantImage } from '../database/entities/product-variant-image.entity';
import { ProductType } from '../database/entities/product-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Category } from '@/database/entities/category.entity';
import dayjs from 'dayjs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductOption)
    private optionRepository: Repository<ProductOption>,
    @InjectRepository(ProductOptionValue)
    private valueRepository: Repository<ProductOptionValue>,
    @InjectRepository(ProductVariant)
    private variantRepository: Repository<ProductVariant>,
    @InjectRepository(ProductVariantImage)
    private imageRepository: Repository<ProductVariantImage>,
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    private configService: ConfigService,
  ) {}

  private bucketName = this.configService.get('AWS_S3_BUCKET');

  async create(
    createProductInput: CreateProductInput,
    userId: string,
  ): Promise<Product> {
    try {
      const [productType, category] = await Promise.all([
        this.productTypeRepository.findOneBy({
          id: createProductInput.productTypeId,
        }),
        this.categoryRepository.findOneBy({
          id: createProductInput.categoryId,
        }),
      ]);

      if (!productType) throw new GraphQLError('Product Type ID is invalid.');
      if (!category) throw new GraphQLError('Category ID is invalid.');

      // 1. สร้าง Product หลัก
      const product = this.productRepository.create({
        name: createProductInput.name,
        description: createProductInput.description,
        productType: productType,
        category: category,
        createdBy: userId,
        updatedBy: userId,
      });
      await this.productRepository.save(product);

      const optionValueMap = new Map<string, ProductOptionValue>();

      // 2. สร้าง Options และ Option Values
      for (const optionInput of createProductInput.options) {
        const productOption = this.optionRepository.create({
          product: product,
          name: optionInput.name,
        });
        await this.optionRepository.save(productOption);

        for (const valueInput of optionInput.values) {
          const optionValue = this.valueRepository.create({
            productOption: productOption,
            ...valueInput,
          });
          await this.valueRepository.save(optionValue);
          optionValueMap.set(optionValue.value, optionValue);
        }
      }

      // 3. สร้าง Variants และ Images
      for (const variantInput of createProductInput.variants) {
        const relatedOptionValues = variantInput.optionValues.map(
          (valueName) => {
            const found = optionValueMap.get(valueName);
            if (!found) {
              throw new GraphQLError(`Option value '${valueName}' not found`);
            }
            return found;
          },
        );

        const generatedSku = await this._generateNextSku(productType);

        const variant = this.variantRepository.create({
          product: product,
          sku: generatedSku,
          price: variantInput.price,
          stock: variantInput.stock,
          optionValues: relatedOptionValues,
        });
        await this.variantRepository.save(variant);

        if (variantInput.images && variantInput.images.length > 0) {
          for (const imageInput of variantInput.images) {
            const image = this.imageRepository.create({
              variant: variant,
              ...imageInput,
              fileBucket: this.bucketName,
            });
            await this.imageRepository.save(image);
          }
        }
      }

      // คืนค่า Product ที่สร้างเสร็จพร้อมข้อมูลทั้งหมด
      return this.findOne(product.id);
    } catch (error) {
      // หากเกิดข้อผิดพลาด, GraphQL จะจัดการ error ที่ throw ออกไป
      throw new GraphQLError(error.message || 'Failed to create product');
    }
  }

  private async _generateNextSku(productType: ProductType): Promise<string> {
    const year = dayjs().format('YY');
    const month = dayjs().format('MM');

    const typePrefix = productType.code.toUpperCase();
    const datePrefix = `${year}${month}`;
    const skuPrefix = `${typePrefix}-${datePrefix}-`;

    const lastVariant = await this.variantRepository.findOne({
      where: {
        sku: Like(`${skuPrefix}%`),
      },
      order: {
        sku: 'DESC',
      },
    });

    let runningNumber = 1;
    if (lastVariant) {
      const lastRunning = parseInt(lastVariant.sku.split('-')[2], 10);
      runningNumber = lastRunning + 1;
    }

    const nextRunning = runningNumber.toString().padStart(5, '0');

    return `${skuPrefix}${nextRunning}`;
  }

  async findAll(searchText?: string, page = 1, limit = 10): Promise<Product[]> {
    const skip = (page - 1) * limit;

    const wheres: FindOptionsWhere<Product>[] = [];

    if (searchText && searchText.trim() !== '') {
      const query = `%${searchText.trim()}%`;

      wheres.push(
        { name: Like(query) },
        { description: Like(query) },
        { variants: { sku: Like(query) } },
        { category: { name: Like(query) } },
        { productType: { name: Like(query) } },
      );
    }

    return this.productRepository.find({
      where: wheres.length > 0 ? wheres : undefined,

      relations: {
        productType: true,
        category: true,
        variants: {
          images: true,
          optionValues: true,
        },
      },
      order: {
        createdAt: 'DESC', // เรียงจากใหม่ไปเก่าเสมอ
      },
      skip: skip, // ข้ามข้อมูลตามหน้า
      take: limit, // จำกัดจำนวนข้อมูลต่อหน้า
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        options: { optionValues: true },
        variants: {
          images: true,
          optionValues: { productOption: true },
        },
      },
    });

    if (!product) {
      throw new GraphQLError(`Product with ID "${id}" not found`, {
        extensions: { code: 'NOT_FOUND' },
      });
    }
    return product;
  }

  async remove(id: string): Promise<Product> {
    const productToRemove = await this.findOne(id);
    await this.productRepository.remove(productToRemove);
    return productToRemove;
  }
}
