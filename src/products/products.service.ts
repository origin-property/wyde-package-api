import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
// import { UpdateProductInput } from './dto/update-product.input';
import { Product } from '../database/entities/product.entity';
import { ProductOption } from '../database/entities/product-option.entity';
import { ProductOptionValue } from '../database/entities/product-option-value.entity';
import { ProductVariant } from '../database/entities/product-variant.entity';
import { ProductVariantImage } from '../database/entities/product-variant-image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { Repository } from 'typeorm';

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
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    try {
      // 1. สร้าง Product หลัก
      const product = this.productRepository.create({
        name: createProductInput.name,
        description: createProductInput.description,
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

        const variant = this.variantRepository.create({
          product: product,
          sku: variantInput.sku,
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

  findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: {
        variants: { images: true, optionValues: true },
      },
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

  // async update(
  //   id: string,
  //   updateProductInput: UpdateProductInput,
  // ): Promise<Product> {
  //   const product = await this.productRepository.preload({
  //     id: id,
  //     ...updateProductInput,
  //   });
  //   if (!product) {
  //     throw new GraphQLError(`Product with ID "${id}" not found`, {
  //       extensions: { code: 'NOT_FOUND' },
  //     });
  //   }
  //   return this.productRepository.save(product);
  // }

  async remove(id: string): Promise<Product> {
    const productToRemove = await this.findOne(id);
    await this.productRepository.remove(productToRemove);
    return productToRemove;
  }
}
