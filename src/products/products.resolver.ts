import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductModel } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { FindAllProductsInput } from './dto/find-all-products.input';
import { CurrentUser } from '@/shared/decorators/decorators';
import { ProductTypeModel } from './entities/product-type.entity';
import { CategoryModel } from './entities/category.entity';
import { ProductVariantModel } from './entities/productVariant.entity';
import { ProductOptionModel } from './entities/productOption.entity';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { Product } from '@/database/entities/product.entity';
import { ProductOption } from '@/database/entities/product-option.entity';
import { Category } from '@/database/entities/category.entity';
import { ProductType } from '@/database/entities/product-type.entity';
import { ProductVariant } from '@/database/entities/product-variant.entity';
import { ProductTypeLoader } from './dataloaders/product-type.loader';
import { CategoryLoader } from './dataloaders/category.loader';
import { VariantsByProductLoader } from './dataloaders/variants-by-product.loader';
import { OptionsByProductLoader } from './dataloaders/options-by-product.loader';

@Resolver(() => ProductModel)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => ProductModel)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @CurrentUser()
    user: any,
  ) {
    return this.productsService.create(createProductInput, user.id);
  }

  @Mutation(() => ProductModel)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
    @CurrentUser() user: any,
  ) {
    return this.productsService.update(updateProductInput, user.id);
  }

  @Mutation(() => ProductModel)
  removeProduct(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: any,
  ) {
    return this.productsService.remove(id, user.id);
  }

  @Query(() => [ProductModel], { name: 'products' })
  findAll(
    @Args('findAllProductsInput') findAllProductsInput: FindAllProductsInput,
  ) {
    const { searchText, page, limit } = findAllProductsInput;

    return this.productsService.findAll(searchText, page, limit);
  }

  @Query(() => ProductModel, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.productsService.findOne(id);
  }

  @ResolveField('productType', () => ProductTypeModel)
  getProductType(
    @Parent() product: Product,
    @Loader(ProductTypeLoader) loader: DataLoader<string, ProductType>,
  ) {
    return loader.load(product.productTypeId);
  }

  @ResolveField('category', () => CategoryModel)
  getCategory(
    @Parent() product: Product,
    @Loader(CategoryLoader) loader: DataLoader<string, Category>,
  ) {
    return loader.load(product.categoryId);
  }

  @ResolveField('variants', () => [ProductVariantModel])
  getVariants(
    @Parent() product: Product,
    @Loader(VariantsByProductLoader)
    loader: DataLoader<string, ProductVariant[]>,
  ) {
    return loader.load(product.id);
  }

  @ResolveField('options', () => [ProductOptionModel])
  getOptions(
    @Parent() product: Product,
    @Loader(OptionsByProductLoader) loader: DataLoader<string, ProductOption[]>,
  ) {
    return loader.load(product.id);
  }
}
