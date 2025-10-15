import { Project } from '@/projects/entities/project.entity';
import { Unit } from '@/projects/entities/unit.entity';
import { ProjectLoader } from '@/projects/projects.loader';
import { UnitLoader } from '@/projects/units.loader';
import { CurrentUser } from '@/shared/decorators/decorators';
import { Roles } from '@/shared/decorators/roles.decorator';
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
import { UpdateQuotationInput } from './dto/update-quotation.input';
import { QuotationItem } from './entities/quotation-item.entity';
import { Quotation } from './entities/quotation.entity';
import { QuotationItemsLoader } from './quotation-items.loader';
import { QuotationsService } from './quotations.service';

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

  @Query(() => [Quotation], { name: 'quotations' })
  async findAll() {
    return this.quotationsService.findAll();
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
    @Loader(ProjectLoader) loader: DataLoader<string, Project>,
  ) {
    return loader.load(projectId);
  }

  @ResolveField(() => Unit)
  async unit(
    @Parent() { unitId }: Quotation,
    @Loader(UnitLoader) loader: DataLoader<string, Unit>,
  ) {
    return loader.load(unitId);
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
