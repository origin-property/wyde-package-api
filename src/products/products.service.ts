import { QueryRunner } from 'typeorm';
import { Category } from '@/database/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { GraphQLError } from 'graphql';
import { FindOptionsWhere, In, Like, Repository, DataSource } from 'typeorm';
import { ProductOptionValue } from '../database/entities/product-option-value.entity';
import { ProductOption } from '../database/entities/product-option.entity';
import { ProductType } from '../database/entities/product-type.entity';
import { ProductVariantImage } from '../database/entities/product-variant-image.entity';
import { ProductVariant } from '../database/entities/product-variant.entity';
import { Product } from '../database/entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductVariantModel } from './entities/productVariant.entity';

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

    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async create(
    createProductInput: CreateProductInput,
    userId: string,
  ): Promise<Product> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const bucketName = this.configService.get('AWS_S3_BUCKET');
    try {
      const {
        productTypeId,
        categoryId,
        name,
        description,
        options: optionsInput,
        variants: variantsInput,
      } = createProductInput;

      // 1. ตรวจสอบข้อมูลหลัก
      const [productType, category] = await Promise.all([
        queryRunner.manager.findOneBy(ProductType, { id: productTypeId }),
        queryRunner.manager.findOneBy(Category, { id: categoryId }),
      ]);

      if (!productType) throw new GraphQLError('Product Type ID is invalid.');
      if (!category) throw new GraphQLError('Category ID is invalid.');

      // 2. สร้างและ SAVE Product (แม่) ก่อนเสมอ
      const product = await queryRunner.manager.save(
        queryRunner.manager.create(Product, {
          name,
          description,
          productType,
          category,
          isActive: true,
          createdBy: userId,
          updatedBy: userId,
        }),
      );

      // 3. 💡 สร้าง Options และ Values พร้อมกัน
      const savedOptionValues = await Promise.all(
        optionsInput.map(async (optionInput) => {
          const productOption = await queryRunner.manager.save(
            queryRunner.manager.create(ProductOption, {
              product,
              name: optionInput.name,
              createdBy: userId,
              updatedBy: userId,
            }),
          );

          return Promise.all(
            optionInput.values.map((valueInput) =>
              queryRunner.manager.save(
                queryRunner.manager.create(ProductOptionValue, {
                  ...valueInput,
                  productOption,
                  createdBy: userId,
                  updatedBy: userId,
                }),
              ),
            ),
          );
        }),
      );

      const optionValueMap = new Map(
        savedOptionValues.flat().map((v) => [v.value, v]),
      );

      await Promise.all(
        variantsInput.map(async (variantInput) => {
          const relatedOptionValues = variantInput.optionValues.map(
            (valueName) => {
              const found = optionValueMap.get(valueName);
              if (!found)
                throw new GraphQLError(`Option value '${valueName}' not found`);
              return found;
            },
          );

          const generatedSku = await this._generateNextSku(productType);

          const variant = await queryRunner.manager.save(
            queryRunner.manager.create(ProductVariant, {
              ...variantInput,
              product,
              sku: generatedSku,
              optionValues: relatedOptionValues,
              isActive: true,
              createdBy: userId,
              updatedBy: userId,
            }),
          );

          if (variantInput.images?.length > 0) {
            console.log('variantInput.images.', variantInput.images);
            const imageEntities = variantInput.images.map((imageInput) =>
              queryRunner.manager.create(ProductVariantImage, {
                ...imageInput,
                variant,
                fileBucket: bucketName,
                createdBy: userId,
                updatedBy: userId,
              }),
            );

            await queryRunner.manager.save(imageEntities);
          }
        }),
      );

      await queryRunner.commitTransaction();
      return this.findOne(product.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new GraphQLError(error.message || 'Failed to create product');
    } finally {
      await queryRunner.release();
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
      withDeleted: true,
    });

    let runningNumber = 1;
    if (lastVariant) {
      const lastRunning = parseInt(lastVariant.sku.split('-')[2], 10);
      runningNumber = lastRunning + 1;
    }

    const nextRunning = runningNumber.toString().padStart(5, '0');

    return `${skuPrefix}${nextRunning}`;
  }

  async findAll(
    searchText?: string,
    categoryIds?: string[],
    page = 1,
    limit = 10,
  ): Promise<Product[]> {
    const skip = (page - 1) * limit;

    const wheres: FindOptionsWhere<Product>[] = [];

    if (searchText && searchText.trim() !== '') {
      const query = `%${searchText.trim()}%`;

      wheres.push(
        { name: Like(query) },
        { description: Like(query) },
        { variants: { sku: Like(query.toLocaleUpperCase()) } },
        { category: { name: Like(query) } },
        { productType: { name: Like(query) } },
      );
    }

    if (categoryIds?.length > 0) {
      wheres.push({ category: { id: In(categoryIds) } });
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
        createdAt: 'DESC',
      },
      skip: skip,
      take: limit,
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

  async update(
    updateProductInput: UpdateProductInput,
    userId: string,
  ): Promise<Product> {
    const {
      id,
      name,
      description,
      productTypeId,
      categoryId,
      createOptions,
      createVariants,
      updateVariants,
      deleteOptionIds,
      deleteVariantIds,
    } = updateProductInput;

    // 1. ค้นหา Product หลักที่จะแก้ไข
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new GraphQLError(`Product with ID "${id}" not found`);
    }

    try {
      // 2. --- จัดการการลบก่อน (ถ้ามี) ---
      if (deleteOptionIds?.length > 0) {
        await this.optionRepository.softDelete({
          id: In(deleteOptionIds),
          productId: id,
        });
      }
      if (deleteVariantIds?.length > 0) {
        await this.variantRepository.softDelete({
          id: In(deleteVariantIds),
          productId: id,
        });
      }

      // 3. --- จัดการการอัปเดต Variant ที่มีอยู่ (ถ้ามี) ---
      if (updateVariants?.length > 0) {
        for (const variantUpdate of updateVariants) {
          const variant = await this.variantRepository.findOneBy({
            id: variantUpdate.id,
            productId: id,
          });
          if (variant) {
            Object.assign(variant, variantUpdate.data); // อัปเดตข้อมูล price, stock
            variant.updatedBy = userId;
            await this.variantRepository.save(variant);
          }
        }
      }

      // 4. --- จัดการการสร้างใหม่ (ถ้ามี) ---
      // (ส่วนนี้จะใช้ Logic คล้ายกับฟังก์ชัน create)
      if (createOptions?.length > 0 || createVariants?.length > 0) {
        // ... สามารถนำ Logic การสร้าง Option/Variant จากฟังก์ชัน create มาใส่ตรงนี้ได้ ...
      }

      // 5. --- อัปเดตข้อมูลหลักของ Product ---
      if (name) product.name = name;
      if (description) product.description = description;

      if (productTypeId) {
        const newProductType = await this.productTypeRepository.findOneBy({
          id: productTypeId,
        });
        if (!newProductType)
          throw new GraphQLError('New Product Type ID is invalid.');
        product.productType = newProductType;
      }
      if (categoryId) {
        const newCategory = await this.categoryRepository.findOneBy({
          id: categoryId,
        });
        if (!newCategory) throw new GraphQLError('New Category ID is invalid.');
        product.category = newCategory;
      }

      product.updatedBy = userId;
      await this.productRepository.save(product);

      return this.findOne(id);
    } catch (error) {
      throw new GraphQLError(error.message || 'Failed to update product');
    }
  }

  async remove(id: string, userId: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        variants: {
          images: true,
        },
        options: {
          optionValues: true,
        },
      },
    });

    if (!product) {
      throw new GraphQLError(`Product with ID "${id}" not found`);
    }

    product.deletedBy = userId;
    await this.productRepository.save(product);

    await this.productRepository.softRemove(product);

    return product;
  }

  async updateIsActiveProduct(
    id: string,
    isActive: boolean,
    userId: string,
  ): Promise<Product> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const product = await queryRunner.manager.findOneBy(Product, { id });

      if (!product) {
        throw new GraphQLError(`Product with ID "${id}" not found`);
      }

      await queryRunner.manager.update(
        ProductVariant,
        { productId: id },
        { isActive: isActive, updatedBy: userId },
      );

      product.isActive = isActive;
      product.updatedBy = userId;
      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();

      return product;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new GraphQLError(
        error.message || 'Failed to update isActive status',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findByVariantIds(
    variantIds: readonly string[],
  ): Promise<ProductVariantModel[]> {
    // 1. ค้นหา Variant จาก ID ที่ได้รับมา
    //    พร้อมกับโหลดข้อมูล Product ที่เป็นแม่ของมันมาด้วย (relations: { product: true })
    const variants = await this.variantRepository.find({
      where: { id: In(variantIds) },
      relations: {
        product: true, // <-- สำคัญมาก: บอกให้ TypeORM ดึง Product มาด้วย
      },
    });

    return variantIds.map((id) =>
      variants.find((variant) => variant.id === id),
    );
  }

  async findTypesByIds(ids: readonly string[]): Promise<ProductType[]> {
    const types = await this.productTypeRepository.findBy({ id: In([...ids]) });
    const map = new Map(types.map((t) => [t.id, t]));
    return ids.map((id) => map.get(id));
  }

  async findCategoriesByIds(ids: readonly string[]): Promise<Category[]> {
    const categories = await this.categoryRepository.findBy({
      id: In([...ids]),
    });
    const map = new Map(categories.map((c) => [c.id, c]));
    return ids.map((id) => map.get(id));
  }

  async findVariantsByProductIds(
    productIds: readonly string[],
  ): Promise<ProductVariant[][]> {
    const variants = await this.variantRepository.find({
      where: { productId: In([...productIds]) },
    });
    const map = new Map<string, ProductVariant[]>();
    productIds.forEach((id) => map.set(id, []));
    variants.forEach((v) => map.get(v.productId).push(v));
    return productIds.map((id) => map.get(id));
  }

  async findImagesByVariantIds(
    variantIds: readonly string[],
  ): Promise<ProductVariantImage[][]> {
    const images = await this.imageRepository.find({
      where: { productVariantId: In([...variantIds]) },
    });
    const map = new Map<string, ProductVariantImage[]>();
    variantIds.forEach((id) => map.set(id, []));
    images.forEach((img) => map.get(img.productVariantId).push(img));
    return variantIds.map((id) => map.get(id));
  }

  async findOptionValuesByVariantIds(
    variantIds: readonly string[],
  ): Promise<ProductOptionValue[][]> {
    const variants = await this.variantRepository.find({
      where: { id: In([...variantIds]) },
      relations: { optionValues: true },
    });
    const map = new Map(variants.map((v) => [v.id, v.optionValues]));
    return variantIds.map((id) => map.get(id) || []);
  }

  async findProductsByIds(ids: readonly string[]): Promise<Product[]> {
    const products = await this.productRepository.findBy({ id: In([...ids]) });
    const map = new Map(products.map((p) => [p.id, p]));
    return ids.map((id) => map.get(id));
  }

  async findOptionsByProductIds(
    productIds: readonly string[],
  ): Promise<ProductOption[][]> {
    const options = await this.optionRepository.find({
      where: { productId: In([...productIds]) },
    });
    const map = new Map<string, ProductOption[]>();
    productIds.forEach((id) => map.set(id, []));
    options.forEach((opt) => map.get(opt.productId).push(opt));
    return productIds.map((id) => map.get(id));
  }

  async findOptionValuesByOptionIds(
    optionIds: readonly string[],
  ): Promise<ProductOptionValue[][]> {
    const values = await this.valueRepository.find({
      where: { productOptionId: In([...optionIds]) },
    });
    const map = new Map<string, ProductOptionValue[]>();
    optionIds.forEach((id) => map.set(id, []));
    values.forEach((val) => map.get(val.productOptionId).push(val));
    return optionIds.map((id) => map.get(id));
  }

  async findOptionsByIds(ids: readonly string[]): Promise<ProductOption[]> {
    const options = await this.optionRepository.findBy({ id: In([...ids]) });
    const map = new Map(options.map((o) => [o.id, o]));
    return ids.map((id) => map.get(id));
  }

  async getProductVariantById(
    ids: readonly string[],
  ): Promise<ProductVariant[]> {
    const variants = await this.variantRepository.findBy({ id: In(ids) });
    const keyData = new Map(variants.map((v) => [v.id, v]));
    return ids.map((id) => keyData.get(id));
  }
}
