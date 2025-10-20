import { Category } from '@/database/entities/category.entity';
import { CurrentUser } from '@/shared/decorators/decorators';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Loader } from '@strv/nestjs-dataloader';
import { CategoryService } from './category.service';
import { CategoryModel } from './dto/category.dto';
import { ProductTypeModel } from './dto/product-type.dto';
import { CreateCategoryInput } from './input/create-category.input';
import {
  CategoryProductTypeLoader,
  CategoryProductTypeLoaderFactory,
} from './loader/CategoryProductTypeLoader.factory';

@Resolver(() => CategoryModel)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [CategoryModel], { name: 'categories' })
  findAll(
    @Args('productTypeId', { type: () => ID, nullable: true })
    productTypeId?: string,
  ) {
    return this.categoryService.findAll(productTypeId);
  }

  @Query(() => CategoryModel, { name: 'category' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => CategoryModel, { name: 'createCategory' })
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    @CurrentUser() user: any, // <-- นำ User ID เข้ามา
  ) {
    return this.categoryService.create(createCategoryInput, user.id);
  }

  @ResolveField('productType', () => ProductTypeModel)
  async productType(
    @Parent() { productTypeId }: Category,
    @Loader(CategoryProductTypeLoaderFactory) loader: CategoryProductTypeLoader,
  ) {
    const result = await loader.load(productTypeId);
    return result?.values;
  }
}
