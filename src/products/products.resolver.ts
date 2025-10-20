import { Category } from '@/database/entities/category.entity';
import { ProductOption } from '@/database/entities/product-option.entity';
import { ProductVariant } from '@/database/entities/product-variant.entity';
import { Product } from '@/database/entities/product.entity';
import { File } from '@/files/entities/file.entity';
import { Project } from '@/projects/dto/project.dto';
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
import { CategoryModel } from './dto/category.dto';
import { PackageItem } from './dto/package.dto';
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
import {
  PackageItemLoader,
  PackageItemLoaderFactory,
} from './loader/PackageItemLoader.factory';
import {
  PackageProjectLoader,
  PackageProjectLoaderFactory,
} from './loader/PackageProjectLoader.factory';
import {
  ProductCategoryLoader,
  ProductCategoryLoaderFactory,
} from './loader/ProductCategoryLoader.factory';
import {
  ProductFileLoader,
  ProductFileLoaderFactory,
} from './loader/ProductFileLoader.factory';
import {
  ProductOptionLoader,
  ProductOptionLoaderFactory,
} from './loader/ProductOptionLoader.factory';
import {
  ProductVariantLoader,
  ProductVariantLoaderFactory,
} from './loader/ProductVariantLoader.factory';
import { PackagesService } from './packages.service';
import { ProductsService } from './products.service';

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
    @Loader(ProductCategoryLoaderFactory) loader: ProductCategoryLoader,
  ) {
    const result = await loader.load(categoryId);
    return result?.values;
  }

  @ResolveField('variants', () => [ProductVariantModel])
  async variants(
    @Parent() { id }: Product,
    @Loader(ProductVariantLoaderFactory) loader: ProductVariantLoader,
  ) {
    const result = await loader.load(id);
    return result?.values || [];
  }

  @ResolveField('options', () => [ProductOptionModel])
  async options(
    @Parent() { id }: Product,
    @Loader(ProductOptionLoaderFactory) loader: ProductOptionLoader,
  ) {
    const result = await loader.load(id);
    return result?.values || [];
  }

  @ResolveField(() => Project, { nullable: true })
  async project(
    @Parent() { packageDetail }: Product,
    @Loader(PackageProjectLoaderFactory) projectLoader: PackageProjectLoader,
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
    @Loader(PackageItemLoaderFactory) packageItemLoader: PackageItemLoader,
  ) {
    const result = await packageItemLoader.load(id);
    return result?.values || [];
  }
}
