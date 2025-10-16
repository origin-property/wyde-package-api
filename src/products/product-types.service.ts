import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductType } from '@/database/entities/product-type.entity';
import { Category } from '@/database/entities/category.entity';
import { Repository, In } from 'typeorm';
import { GraphQLError } from 'graphql';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<ProductType[]> {
    return this.productTypeRepository.find();
  }

  async findOne(id: string): Promise<ProductType> {
    const productType = await this.productTypeRepository.findOneBy({ id });
    if (!productType) {
      throw new GraphQLError(`Product Type with ID "${id}" not found`);
    }
    return productType;
  }

  async findByIds(ids: readonly string[]): Promise<ProductType[]> {
    const types = await this.productTypeRepository.findBy({ id: In([...ids]) });
    const map = new Map(types.map((t) => [t.id, t]));
    return ids.map((id) => map.get(id));
  }

  async findCategoriesByProductTypeIds(
    productTypeIds: readonly string[],
  ): Promise<Category[][]> {
    const categories = await this.categoryRepository.find({
      where: { productTypeId: In([...productTypeIds]) },
    });
    const map = new Map<string, Category[]>();
    productTypeIds.forEach((id) => map.set(id, []));
    categories.forEach((cat) => map.get(cat.productTypeId).push(cat));
    return productTypeIds.map((id) => map.get(id));
  }
}
