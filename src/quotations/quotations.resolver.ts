import { File } from '@/files/entities/file.entity';
import { FileLoader } from '@/files/files.loader';
import { Project } from '@/projects/entities/project.entity';
import { Unit } from '@/projects/entities/unit.entity';
import { CurrentUser } from '@/shared/decorators/decorators';
import { Roles } from '@/shared/decorators/roles.decorator';
import { QuotationStatus } from '@/shared/enums/quotation.enum';
import { User } from '@/users/entities/user.entity';
import { UserLoader } from '@/users/users.loader';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { CreateQuotationInput } from './dto/create-quotation.input';
import { SearchQuotationArgs } from './dto/search-quotation.agrs';
import { UpdateQuotationInput } from './dto/update-quotation.input';
import { QuotationItem } from './entities/quotation-item.entity';
import { QuotationPaginate } from './entities/quotation-paginate.entity';
import { Quotation } from './entities/quotation.entity';
import { QuotationItemsLoader } from './quotation-items.loader';
import { QuotationsService } from './quotations.service';
import { Loader as Loader2 } from '@strv/nestjs-dataloader';
import {
  QuotationUnitLoader,
  QuotationUnitLoaderFactory,
} from './QuotationUnitLoader.factory';
import { PackageProjectLoaderFactory } from '../packages/PackageProjectLoader.factory';
import { QuotationProjectLoader } from './QuotationProjectLoader.factory';

@Resolver(() => Quotation)
export class QuotationsResolver {
  constructor(private readonly quotationsService: QuotationsService) {}

  @Mutation(() => Quotation)
  async createQuotation(
    @Args('createQuotationInput') createQuotationInput: CreateQuotationInput,
    @CurrentUser() user: User,
  ) {
    return this.quotationsService.create(createQuotationInput, user.id);
  }

  @Query(() => QuotationPaginate, { name: 'quotations' })
  async findAll(@Args() searchQuotationArgs: SearchQuotationArgs) {
    return this.quotationsService.searchWithPaginate(searchQuotationArgs);
  }

  @Query(() => Quotation, { name: 'quotation' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.quotationsService.findOne(id);
  }

  @Mutation(() => Quotation)
  async updateQuotation(
    @Args('updateQuotationInput') updateQuotationInput: UpdateQuotationInput,
    @CurrentUser() user: User,
  ) {
    return this.quotationsService.update(
      updateQuotationInput.id,
      updateQuotationInput,
      user.id,
    );
  }

  @Mutation(() => Quotation)
  async updateQuotationStatus(
    @Args('id', { type: () => ID }) id: string,
    @Args('status', { type: () => QuotationStatus }) status: QuotationStatus,
    @CurrentUser() user: User,
  ) {
    return this.quotationsService.updateStatus(id, status, user.id);
  }

  @Roles(['admin'])
  @Mutation(() => Quotation)
  async removeQuotation(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ) {
    return this.quotationsService.remove(id, user.id);
  }

  @ResolveField(() => [QuotationItem])
  async items(
    @Parent() { id }: Quotation,
    @Loader(QuotationItemsLoader) loader: DataLoader<string, QuotationItem[]>,
  ) {
    return loader.load(id);
  }

  @ResolveField(() => Project)
  async project(
    @Parent() { projectId }: Quotation,
    @Loader2(PackageProjectLoaderFactory) projectLoader: QuotationProjectLoader,
  ) {
    const result = await projectLoader.load(projectId);
    return result?.values?.[0];
  }

  @ResolveField(() => Unit)
  async unit(
    @Parent() { unitId }: Quotation,
    @Loader2(QuotationUnitLoaderFactory) units: QuotationUnitLoader,
  ) {
    const result = await units.load(unitId);
    return result?.values?.[0];
  }

  @ResolveField(() => File, { nullable: true, description: 'ลายเซ็นลูกค้า' })
  async file(
    @Parent() { id }: Quotation,
    @Loader(FileLoader) loader: DataLoader<string, File>,
  ) {
    return loader.load(id);
  }

  @ResolveField(() => User, { nullable: true })
  async createdBy(
    @Parent() { createdBy }: User,
    @Loader(UserLoader) loader: DataLoader<string, User>,
  ) {
    return createdBy ? loader.load(createdBy) : null;
  }

  @ResolveField(() => User, { nullable: true })
  async updatedBy(
    @Parent() { updatedBy }: User,
    @Loader(UserLoader) loader: DataLoader<string, User>,
  ) {
    return updatedBy ? loader.load(updatedBy) : null;
  }

  @ResolveField(() => User, { nullable: true })
  async deletedBy(
    @Parent() { deletedBy }: User,
    @Loader(UserLoader) loader: DataLoader<string, User>,
  ) {
    return deletedBy ? loader.load(deletedBy) : null;
  }
}
