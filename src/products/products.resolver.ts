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
import { DataloadersService } from './dataloaders/dataloaders.service';
import { ProductTypeModel } from './entities/product-type.entity';
import { CategoryModel } from './entities/category.entity';
import { ProductVariantModel } from './entities/productVariant.entity';
import { ProductOptionModel } from './entities/productOption.entity';

@Resolver(() => ProductModel)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly dataloadersService: DataloadersService,
  ) {}

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
  getProductType(@Parent() product: ProductModel) {
    return this.dataloadersService.productTypeLoader.load(
      product.productTypeId,
    );
  }

  @ResolveField('category', () => CategoryModel)
  getCategory(@Parent() product: ProductModel) {
    return this.dataloadersService.categoryLoader.load(product.categoryId);
  }

  @ResolveField('variants', () => [ProductVariantModel])
  getVariants(@Parent() product: ProductModel) {
    return this.dataloadersService.variantsByProductIdLoader.load(product.id);
  }

  @ResolveField('options', () => [ProductOptionModel])
  getOptions(@Parent() product: ProductModel) {
    return this.dataloadersService.optionsByProductIdLoader.load(product.id);
  }
}
