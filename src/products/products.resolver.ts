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
import { CreatePackageInput } from './dto/create-package.input';
import { PackagesService } from './packages.service';
import { PackageItem } from './entities/package.entity';
import { Loader as Loader2 } from '@strv/nestjs-dataloader';
import { ProductByVariantIdLoader } from './product-variant.loader';
import {
  PackageItemLoader,
  PackageItemLoaderFactory,
} from './dataloaders/PackageItemLoader.factory';
import { Project } from '@/projects/entities/project.entity';
import {
  PackageProjectLoader,
  PackageProjectLoaderFactory,
} from './dataloaders/PackageProjectLoader.factory';

@Resolver(() => ProductModel)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly packagesService: PackagesService,
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
  createPackage(
    @Args('createPackageInput') createPackageInput: CreatePackageInput,
    @CurrentUser() user: any,
  ) {
    return this.packagesService.create(createPackageInput, user.id);
  }

  @Query(() => [ProductModel], { name: 'packagesByUnit' })
  findAllPackagesByUnit(
    @Args('unitId', { type: () => String }) unitId: string,
  ) {
    return this.packagesService.findAllByUnitId(unitId);
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
    const { searchText, categoryIds, page, limit } = findAllProductsInput;

    return this.productsService.findAll(searchText, categoryIds, page, limit);
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

  @ResolveField(() => Project)
  async project(
    @Parent() { packageDetail }: Product,
    @Loader2(PackageProjectLoaderFactory) projectLoader: PackageProjectLoader,
  ) {
    const result = await projectLoader.load(packageDetail.projectId);
    return result?.values?.[0];
  }

  @ResolveField(() => [PackageItem])
  async packageItems(
    @Parent() { id }: Product,
    @Loader2(PackageItemLoaderFactory) loader: PackageItemLoader,
  ) {
    const result = await loader.load(id);
    return result?.values || [];
  }
}

@Resolver(() => PackageItem)
export class PackageItemsResolver {
  // constructor(private readonly packageItemsService: PackageItemsService) {}

  @ResolveField(() => ProductVariantModel)
  async product(
    @Parent() { productVariantId }: PackageItem,
    @Loader(ProductByVariantIdLoader)
    productByVariantLoader: DataLoader<string, ProductVariantModel>,
  ): Promise<ProductVariantModel> {
    return productByVariantLoader.load(productVariantId);
  }
}
