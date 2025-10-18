import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryModel } from './dto/category.dto';
import { ProductTypeModel } from './dto/product-type.dto';
import { Category } from '@/database/entities/category.entity';
import { ProductType } from '@/database/entities/product-type.entity';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { ProductTypeByIdLoader } from './dataloaders/product-type-by-id.loader';
import { CreateCategoryInput } from './input/create-category.input';
import { CurrentUser } from '@/shared/decorators/decorators';

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
  getProductType(
    @Parent() category: Category,
    @Loader(ProductTypeByIdLoader) loader: DataLoader<string, ProductType>,
  ) {
    return loader.load(category.productTypeId);
  }
}
