import { Category } from '@/database/entities/category.entity';
import { ProductType } from '@/database/entities/product-type.entity';
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { CategoryModel } from './dto/category.dto';
import { ProductTypeModel } from './dto/product-type.dto';
import { CategoriesByProductTypeLoader } from './loader/categories-by-product-type.loader';
import { ProductTypesService } from './product-types.service';

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
