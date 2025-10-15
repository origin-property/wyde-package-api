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
import { ProjectLoader } from '@/projects/projects.loader';
import { Unit } from '@/projects/entities/unit.entity';
import { UnitLoader } from '@/projects/units.loader';
import { ProductByVariantIdLoader } from '@/products/product-variant.loader';
import { File } from '@/files/entities/file.entity';
import { FilesLoader } from '@/files/files.loader';
import { PackageItemLoader } from './package.loader';
import { ProductVariantModel } from '@/products/entities/productVariant.entity';

@Resolver(() => Package)
export class PackagesResolver {
  constructor(private readonly packagesService: PackagesService) {}

  @Mutation(() => Package)
  createPackage(
    @Args('input') input: CreatePackageInput,
    @CurrentUser() user: User,
  ): Promise<Package> {
    return this.packagesService.create(input, user.id);
  }

  @Query(() => [Package], { name: 'packagesByUnit' })
  findAll(
    @Args('unitId', { type: () => String }) unitId: string,
  ): Promise<Package[]> {
    return this.packagesService.findAllByUnitId(unitId);
  }

  @Query(() => Package, { name: 'package' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<Package> {
    return this.packagesService.findOne(id);
  }

  @Mutation(() => Boolean)
  removePackage(
    @Args('id', { type: () => String }) id: string,
  ): Promise<boolean> {
    return this.packagesService.remove(id);
  }

  @ResolveField(() => Project)
  async project(
    @Parent() { projectId }: Package,
    @Loader(ProjectLoader) projectLoader: DataLoader<string, Project>,
  ): Promise<Project> {
    return projectLoader.load(projectId);
  }

  @ResolveField(() => Unit)
  async unit(
    @Parent() { unitId }: Package,
    @Loader(UnitLoader) unitLoader: DataLoader<string, Unit>,
  ): Promise<Unit> {
    return unitLoader.load(unitId);
  }

  @ResolveField(() => [File])
  async images(
    @Parent() { id }: Package,
    @Loader(FilesLoader) fileLoader: DataLoader<string, File[]>,
  ): Promise<File[]> {
    return fileLoader.load(id);
  }

  @ResolveField(() => [PackageItem])
  async items(
    @Parent() { id }: Package,
    @Loader(PackageItemLoader) itemLoader: DataLoader<string, PackageItem[]>,
  ) {
    return itemLoader.load(id);
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
