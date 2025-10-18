import {
  Resolver,
  Query,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductTypesService } from './product-types.service';
import { ProductTypeModel } from './dto/product-type.dto';
import { CategoryModel } from './dto/category.dto';
import { ProductType } from '@/database/entities/product-type.entity';
import { CategoriesByProductTypeLoader } from './dataloaders/categories-by-product-type.loader';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { Category } from '@/database/entities/category.entity';

@Resolver(() => ProductTypeModel)
export class ProductTypesResolver {
  constructor(private readonly productTypesService: ProductTypesService) {}

  @Query(() => [ProductTypeModel], { name: 'productTypes' })
  findAll() {
    return this.productTypesService.findAll();
  }

  @Query(() => ProductTypeModel, { name: 'productType' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.productTypesService.findOne(id);
  }

  @ResolveField('categories', () => [CategoryModel])
  getCategories(
    @Parent() productType: ProductType,
    @Loader(CategoriesByProductTypeLoader)
    loader: DataLoader<string, Category[]>,
  ) {
    return loader.load(productType.id);
  }
}
