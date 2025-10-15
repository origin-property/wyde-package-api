import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';

import { Product } from '@/database/entities/product.entity';
import { ProductType } from '@/database/entities/product-type.entity';
import { Category } from '@/database/entities/category.entity';
import { ProductOption } from '@/database/entities/product-option.entity';
import { ProductOptionValue } from '@/database/entities/product-option-value.entity';
import { ProductVariant } from '@/database/entities/product-variant.entity';
import { ProductVariantImage } from '@/database/entities/product-variant-image.entity';

@Injectable()
export class DataloadersService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductType)
    private readonly productTypeRepository: Repository<ProductType>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(ProductOption)
    private readonly optionRepository: Repository<ProductOption>,
    @InjectRepository(ProductOptionValue)
    private readonly valueRepository: Repository<ProductOptionValue>,
    @InjectRepository(ProductVariant)
    private readonly variantRepository: Repository<ProductVariant>,
    @InjectRepository(ProductVariantImage)
    private readonly imageRepository: Repository<ProductVariantImage>,
  ) {}

  private _createMapAndSort<T extends { id: string }>(
    ids: readonly string[],
    entities: T[],
  ): T[] {
    const map = new Map(entities.map((entity) => [entity.id, entity]));
    return ids.map((id) => map.get(id));
  }

  public readonly productTypeLoader = new DataLoader<string, ProductType>(
    async (ids: string[]) => {
      const types = await this.productTypeRepository.findBy({ id: In(ids) });
      return this._createMapAndSort(ids, types);
    },
  );

  public readonly categoryLoader = new DataLoader<string, Category>(
    async (ids: string[]) => {
      const categories = await this.categoryRepository.findBy({ id: In(ids) });
      return this._createMapAndSort(ids, categories);
    },
  );

  public readonly productByIdLoader = new DataLoader<string, Product>(
    async (ids: string[]) => {
      const products = await this.productRepository.findBy({ id: In(ids) });
      return this._createMapAndSort(ids, products);
    },
  );

  public readonly productTypeByIdLoader = new DataLoader<string, ProductType>(
    async (ids: string[]) => {
      const types = await this.productTypeRepository.findBy({ id: In(ids) });
      return this._createMapAndSort(ids, types);
    },
  );

  public readonly categoryByIdLoader = new DataLoader<string, Category>(
    async (ids: string[]) => {
      const categories = await this.categoryRepository.findBy({ id: In(ids) });
      return this._createMapAndSort(ids, categories);
    },
  );

  public readonly optionsByProductIdLoader = new DataLoader<
    string,
    ProductOption[]
  >(async (productIds: string[]) => {
    const options = await this.optionRepository.find({
      where: { productId: In(productIds) },
    });
    const map = new Map<string, ProductOption[]>();
    productIds.forEach((id) => map.set(id, []));
    options.forEach((opt) => map.get(opt.productId).push(opt));
    return productIds.map((id) => map.get(id));
  });

  public readonly optionValuesByOptionIdLoader = new DataLoader<
    string,
    ProductOptionValue[]
  >(async (optionIds: string[]) => {
    const values = await this.valueRepository.find({
      where: { productOptionId: In(optionIds) },
    });
    const map = new Map<string, ProductOptionValue[]>();
    optionIds.forEach((id) => map.set(id, []));
    values.forEach((val) => map.get(val.productOptionId).push(val));
    return optionIds.map((id) => map.get(id));
  });

  public readonly variantsByProductIdLoader = new DataLoader<
    string,
    ProductVariant[]
  >(async (productIds: string[]) => {
    const variants = await this.variantRepository.find({
      where: { productId: In(productIds) },
    });
    const map = new Map<string, ProductVariant[]>();
    productIds.forEach((id) => map.set(id, []));
    variants.forEach((v) => map.get(v.productId).push(v));
    return productIds.map((id) => map.get(id));
  });

  public readonly imagesByVariantIdLoader = new DataLoader<
    string,
    ProductVariantImage[]
  >(async (variantIds: string[]) => {
    const images = await this.imageRepository.find({
      where: { productVariantId: In(variantIds) },
    });
    const map = new Map<string, ProductVariantImage[]>();
    variantIds.forEach((id) => map.set(id, []));
    images.forEach((img) => map.get(img.productVariantId).push(img));
    return variantIds.map((id) => map.get(id));
  });

  public readonly optionValuesByVariantIdLoader = new DataLoader<
    string,
    ProductOptionValue[]
  >(async (variantIds: string[]) => {
    const variants = await this.variantRepository.find({
      where: { id: In(variantIds) },
      relations: { optionValues: true },
    });
    const map = new Map(variants.map((v) => [v.id, v.optionValues]));
    return variantIds.map((id) => map.get(id) || []);
  });

  public readonly productOptionByIdLoader = new DataLoader<
    string,
    ProductOption
  >(async (ids: string[]) => {
    const options = await this.optionRepository.findBy({ id: In(ids) });
    return this._createMapAndSort(ids, options);
  });
}
