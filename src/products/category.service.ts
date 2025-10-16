import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@/database/entities/category.entity';
import { ProductType } from '@/database/entities/product-type.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { FindOptionsWhere, Repository, In } from 'typeorm';
import { GraphQLError } from 'graphql';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
  ) {}

  findAll(productTypeId?: string): Promise<Category[]> {
    const where: FindOptionsWhere<Category> = {};
    if (productTypeId) {
      where.productTypeId = productTypeId;
    }
    return this.categoryRepository.find({ where });
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new GraphQLError(`Category with ID "${id}" not found`);
    }
    return category;
  }

  async findByIds(ids: readonly string[]): Promise<Category[]> {
    const categories = await this.categoryRepository.findBy({
      id: In([...ids]),
    });
    const map = new Map(categories.map((c) => [c.id, c]));
    return ids.map((id) => map.get(id));
  }

  async create(
    createCategoryInput: CreateCategoryInput,
    userId: string,
  ): Promise<Category> {
    const productType = await this.productTypeRepository.findOneBy({
      id: createCategoryInput.productTypeId,
    });
    if (!productType) {
      throw new GraphQLError('Product Type ID is invalid.');
    }

    const existingCategory = await this.categoryRepository.findOneBy({
      name: createCategoryInput.name,
    });
    if (existingCategory) {
      throw new GraphQLError(
        `Category with name "${createCategoryInput.name}" already exists.`,
      );
    }

    try {
      const newCategory = this.categoryRepository.create({
        ...createCategoryInput,
        productType: productType,
        createdBy: userId,
        updatedBy: userId,
      });

      return await this.categoryRepository.save(newCategory);
    } catch (error) {
      throw new GraphQLError(error.message || 'Failed to create category.');
    }
  }
}
