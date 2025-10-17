import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import DataLoader from 'dataloader';

import { PackagesService } from './packages.service';
import { Package, PackageItem } from './entities/package.entity';
import { CreatePackageInput } from './dto/create-package.input';
import { CurrentUser } from '@/shared/decorators/decorators';
import { User } from '@/users/entities/user.entity';
import { Project } from '@/projects/entities/project.entity';
import { Loader } from '@tracworx/nestjs-dataloader';
import { Unit } from '@/projects/entities/unit.entity';
import { ProductByVariantIdLoader } from '@/products/product-variant.loader';
import { File } from '@/files/entities/file.entity';
import { ProductVariantModel } from '@/products/entities/productVariant.entity';
import {
  PackageUnitLoader,
  PackageUnitLoaderFactory,
} from './PackageUnitLoader.factory';
import { Loader as Loader2 } from '@strv/nestjs-dataloader';
import {
  PackageProjectLoader,
  PackageProjectLoaderFactory,
} from './PackageProjectLoader.factory';
import {
  PackageItemLoader,
  PackageItemLoaderFactory,
} from './PackageItemLoader.factory';
import {
  PackageImageLoader,
  PackageImageLoaderFactory,
} from './PackageImageLoader.factory';
import { Product } from '@/database/entities/product.entity';

@Resolver(() => Product)
export class PackagesResolver {
  constructor(private readonly packagesService: PackagesService) {}

  @Mutation(() => Product)
  createPackage(
    @Args('input') input: CreatePackageInput,
    @CurrentUser() user: User,
  ): Promise<Product> {
    return this.packagesService.create(input, user.id);
  }

  @Query(() => [Product], { name: 'packagesByUnit' })
  findAll(
    @Args('unitId', { type: () => String }) unitId: string,
  ): Promise<Product[]> {
    return this.packagesService.findAllByUnitId(unitId);
  }

  // @Query(() => Package, { name: 'package' })
  // findOne(@Args('id', { type: () => String }) id: string): Promise<Package> {
  //   return this.packagesService.findOne(id);
  // }

  // @Mutation(() => Boolean)
  // removePackage(
  //   @Args('id', { type: () => String }) id: string,
  // ): Promise<boolean> {
  //   return this.packagesService.remove(id);
  // }

  @ResolveField(() => Project)
  async project(
    @Parent() { projectId }: Package,
    @Loader2(PackageProjectLoaderFactory) projectLoader: PackageProjectLoader,
  ) {
    const result = await projectLoader.load(projectId);
    return result?.values?.[0];
  }

  @ResolveField(() => Unit)
  async unit(
    @Parent() { unitId }: Package,
    @Loader2(PackageUnitLoaderFactory) units: PackageUnitLoader,
  ) {
    const result = await units.load(unitId);
    return result?.values?.[0];
  }

  @ResolveField(() => [File])
  async images(
    @Parent() { id }: Package,
    @Loader2(PackageImageLoaderFactory) loader: PackageImageLoader,
  ) {
    const result = await loader.load(id);
    return result?.values || [];
  }

  @ResolveField(() => [PackageItem])
  async items(
    @Parent() { id }: Package,
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
