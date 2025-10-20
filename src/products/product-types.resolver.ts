import { ProductType } from '@/database/entities/product-type.entity';
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Loader } from '@strv/nestjs-dataloader';
import { CategoryModel } from './dto/category.dto';
import { ProductTypeModel } from './dto/product-type.dto';
import {
  ProductTypeCategoryLoader,
  ProductTypeCategoryLoaderFactory,
} from './loader/ProductTypeCategoryLoader.factory';
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
  async categories(
    @Parent() { id }: ProductType,
    @Loader(ProductTypeCategoryLoaderFactory) loader: ProductTypeCategoryLoader,
  ) {
    const result = await loader.load(id);
    return result?.values || [];
  }
}
