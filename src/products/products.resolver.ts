import { Category } from '@/database/entities/category.entity';
import { ProductOption } from '@/database/entities/product-option.entity';
import { ProductType } from '@/database/entities/product-type.entity';
import { ProductVariant } from '@/database/entities/product-variant.entity';
import { Product } from '@/database/entities/product.entity';
import { File } from '@/files/entities/file.entity';
import { Project } from '@/projects/dto/project.dto';
import { CurrentUser } from '@/shared/decorators/decorators';
import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Loader as Loader2 } from '@strv/nestjs-dataloader';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { CategoryModel } from './dto/category.dto';
import { PackageItem } from './dto/package.dto';
import { ProductTypeModel } from './dto/product-type.dto';
import { ProductModel } from './dto/product.dto';
import { ProductOptionModel } from './dto/productOption.dto';
import { ProductVariantModel } from './dto/productVariant.dto';
import {
  CreatePackageInput,
  UpdatePacakgeInput,
} from './input/create-package.input';
import { CreateProductInput } from './input/create-product.input';
import {
  FindAllPackagesInput,
  FindAllProductsInput,
} from './input/find-all-products.input';
import { UpdateProductInput } from './input/update-product.input';
import { OptionsByProductLoader } from './loader/options-by-product.loader';
import {
  PackageItemLoader,
  PackageItemLoaderFactory,
} from './loader/PackageItemLoader.factory';
import {
  PackageProjectLoader,
  PackageProjectLoaderFactory,
} from './loader/PackageProjectLoader.factory';
import { ProductTypeLoader } from './loader/product-type.loader';
import {
  ProductFileLoader,
  ProductFileLoaderFactory,
} from './loader/ProductFileLoader.factory';
import { VariantsByProductLoader } from './loader/variants-by-product.loader';
import { PackagesService } from './packages.service';
import { ProductByVariantIdLoader } from './loader/product-variant.loader';
import { ProductsService } from './products.service';
import {
  ProductCategoryLoader,
  ProductCategoryLoaderFactory,
} from './loader/ProductCategoryLoader.factory';

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

  @Mutation(() => ProductModel)
  updatePackage(
    @Args('input') input: UpdatePacakgeInput,
    @CurrentUser() user: any,
  ) {
    return this.packagesService.update(input, user.id);
  }

  @Query(() => [ProductModel], { name: 'packages' })
  findAllPackages(
    @Args('input', { type: () => FindAllPackagesInput })
    input: FindAllPackagesInput,
  ) {
    return this.packagesService.findAll(input);
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
  findOne(@Args('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ResolveField('category', () => CategoryModel, { nullable: true })
  async category(
    @Parent() { categoryId }: Product,
    @Loader2(ProductCategoryLoaderFactory) loader: ProductCategoryLoader,
  ) {
    const result = await loader.load(categoryId);
    return result?.values;
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

  @ResolveField(() => Project, { nullable: true })
  async project(
    @Parent() { packageDetail }: Product,
    @Loader2(PackageProjectLoaderFactory) projectLoader: PackageProjectLoader,
  ) {
    if (packageDetail) {
      const result = await projectLoader.load(packageDetail.projectId);
      return result?.values?.[0];
    }

    return null;
  }

  @ResolveField(() => String, { nullable: true })
  model(@Parent() { packageDetail }: Product) {
    return packageDetail?.modelId ?? null;
  }

  @ResolveField(() => [PackageItem])
  async packageItems(
    @Parent() { id }: Product,
    @Loader2(PackageItemLoaderFactory) packageItemLoader: PackageItemLoader,
  ) {
    const result = await packageItemLoader.load(id);
    return result?.values || [];
  }

  @ResolveField(() => [File])
  async images(
    @Parent() { id }: Product,
    @Loader2(ProductFileLoaderFactory) productFileLoader: ProductFileLoader,
  ) {
    const result = await productFileLoader.load(id);
    return result?.values || [];
  }
}
@Resolver(() => PackageItem)
export class PackageItemsResolver {
  @ResolveField(() => ProductVariantModel)
  async product(
    @Parent() { productVariantId }: PackageItem,
    @Loader(ProductByVariantIdLoader)
    productByVariantLoader: DataLoader<string, ProductVariantModel>,
  ): Promise<ProductVariantModel> {
    return productByVariantLoader.load(productVariantId);
  }
}
