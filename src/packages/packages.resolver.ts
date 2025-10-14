import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PackagesService } from './packages.service';
import { Package } from './entities/package.entity';
import { CreatePackageInput } from './dto/create-package.input';
import { UpdatePackageInput } from './dto/update-package.input';

@Resolver(() => Package)
export class PackagesResolver {
  constructor(private readonly packagesService: PackagesService) {}

  @Mutation(() => Package)
  createPackage(@Args('createPackageInput') createPackageInput: CreatePackageInput) {
    return this.packagesService.create(createPackageInput);
  }

  @Query(() => [Package], { name: 'packages' })
  findAll() {
    return this.packagesService.findAll();
  }

  @Query(() => Package, { name: 'package' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.packagesService.findOne(id);
  }

  @Mutation(() => Package)
  updatePackage(@Args('updatePackageInput') updatePackageInput: UpdatePackageInput) {
    return this.packagesService.update(updatePackageInput.id, updatePackageInput);
  }

  @Mutation(() => Package)
  removePackage(@Args('id', { type: () => Int }) id: number) {
    return this.packagesService.remove(id);
  }
}
