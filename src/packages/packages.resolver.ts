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
import { Product } from '@/database/entities/product.entity';

@Resolver(() => Package)
export class PackagesResolver {
  constructor(private readonly packagesService: PackagesService) {}

  @Mutation(() => Package)
  createPackage(
    @Args('createPackageInput') createPackageInput: CreatePackageInput,
    @CurrentUser() user: User,
  ) {
    return this.packagesService.create(createPackageInput, user.id);
  }

  @Query(() => [Package], { name: 'packagesByUnit' })
  findAll(@Args('unitId', { type: () => String }) unitId: string) {
    return this.packagesService.findAllByUnitId(unitId);
  }

  @Query(() => Package, { name: 'package' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.packagesService.findOne(id);
  }

  @Mutation(() => Package)
  removePackage(@Args('id', { type: () => String }) id: string) {
    return this.packagesService.remove(id);
  }

  @ResolveField(() => Project)
  async project(
    @Parent() { projectId }: Package,
    @Loader(ProjectLoader) projectLoader: DataLoader<string, Project>,
  ) {
    return projectLoader.load(projectId);
  }

  @ResolveField(() => Unit)
  async unit(
    @Parent() { unitId }: Package,
    @Loader(UnitLoader) unitLoader: DataLoader<string, Unit>,
  ) {
    return unitLoader.load(unitId);
  }
}

// @Resolver(() => PackageItem)
// export class PackageItemsResolver {
//   // constructor(private readonly packageItemsService: PackageItemsService) {}

//   @ResolveField(() => Product)
//   async product(
//     @Parent() { productVariantId }: PackageItem,
//     @Loader(ProductByVariantLoader)
//     productByVariantLoader: DataLoader<string, Product>,
//   ) {
//     return productByVariantLoader.load(productVariantId);
//   }
// }
