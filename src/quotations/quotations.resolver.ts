import { File } from '@/files/entities/file.entity';
import { Project } from '@/projects/entities/project.entity';
import { Unit } from '@/projects/entities/unit.entity';
import { CurrentUser } from '@/shared/decorators/decorators';
import { Roles } from '@/shared/decorators/roles.decorator';
import { PromotionKind } from '@/shared/enums/promotion.enum';
import { QuotationStatus } from '@/shared/enums/quotation.enum';
import { User } from '@/users/entities/user.entity';
import {
  Args,
  Float,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Loader } from '@strv/nestjs-dataloader';
import { sumBy } from 'lodash';
import { PackageProjectLoaderFactory } from '../products/dataloaders/PackageProjectLoader.factory';
import { CreateQuotationInput } from './dto/create-quotation.input';
import { SearchQuotationArgs } from './dto/search-quotation.agrs';
import { UpdateQuotationInput } from './dto/update-quotation.input';
import { QuotationItem } from './entities/quotation-item.entity';
import { QuotationPaginate } from './entities/quotation-paginate.entity';
import { QuotationPromotionDto } from './entities/quotation-promotion.dto';
import { Quotation } from './entities/quotation.entity';
import {
  QuotationFileLoader,
  QuotationFileLoaderFactory,
} from './QuotationFileLoader.factory';
import {
  QuotationItemLoader,
  QuotationItemLoaderFactory,
} from './QuotationItemLoader.factory';
import { QuotationProjectLoader } from './QuotationProjectLoader.factory';
import {
  QuotationPromotionLoader,
  QuotationPromotionLoaderFactory,
} from './QuotationPromotionLoader.factory';
import { QuotationsService } from './quotations.service';
import {
  QuotationUnitLoader,
  QuotationUnitLoaderFactory,
} from './QuotationUnitLoader.factory';
import {
  QuotationUserLoader,
  QuotationUserLoaderFactory,
} from './QuotationUserLoader.factory';

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

  @Roles(['admin'])
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
    @Loader(QuotationItemLoaderFactory) loader: QuotationItemLoader,
  ) {
    const result = await loader.load(id);
    return result?.values || [];
  }

  @ResolveField(() => [QuotationPromotionDto])
  async promotions(
    @Parent() { id }: Quotation,
    @Loader(QuotationPromotionLoaderFactory) loader: QuotationPromotionLoader,
  ) {
    const result = await loader.load(id);
    return result?.values || [];
  }

  @ResolveField(() => Float, { defaultValue: 0, description: 'ส่วนลดพิเศษ' })
  async discount(
    @Parent() { id }: Quotation,
    @Loader(QuotationPromotionLoaderFactory) loader: QuotationPromotionLoader,
  ) {
    const promotions = await loader.load(id);
    if (!promotions.values) return 0;
    const discounts = promotions.values.filter(
      (promotion) => promotion.kind === PromotionKind.DISCOUNT,
    );
    return sumBy(discounts, (discount) => Number(discount.value));
  }

  @ResolveField(() => Float, { defaultValue: 0, description: 'voucher wyde' })
  async voucher(
    @Parent() { id }: Quotation,
    @Loader(QuotationPromotionLoaderFactory) loader: QuotationPromotionLoader,
  ) {
    const promotions = await loader.load(id);
    if (!promotions.values) return 0;
    const vouchers = promotions.values.filter(
      (promotion) => promotion.kind === PromotionKind.VOUCHER,
    );
    return sumBy(vouchers, (voucher) => Number(voucher.value));
  }

  @ResolveField(() => Project)
  async project(
    @Parent() { projectId }: Quotation,
    @Loader(PackageProjectLoaderFactory) projectLoader: QuotationProjectLoader,
  ) {
    const result = await projectLoader.load(projectId);
    return result?.values?.[0];
  }

  @ResolveField(() => Unit)
  async unit(
    @Parent() { unitId }: Quotation,
    @Loader(QuotationUnitLoaderFactory) units: QuotationUnitLoader,
  ) {
    const result = await units.load(unitId);
    return result?.values?.[0];
  }

  @ResolveField(() => File, { nullable: true, description: 'ลายเซ็นลูกค้า' })
  async signatureFile(
    @Parent() { id }: Quotation,
    @Loader(QuotationFileLoaderFactory) units: QuotationFileLoader,
  ) {
    const result = await units.load(id);
    return result?.values || null;
  }

  @ResolveField(() => User, { nullable: true })
  async createdBy(
    @Parent() { createdBy }: User,
    @Loader(QuotationUserLoaderFactory) units: QuotationUserLoader,
  ) {
    const result = await units.load(createdBy);
    return result?.values || null;
  }

  @ResolveField(() => User, { nullable: true })
  async updatedBy(
    @Parent() { updatedBy }: User,
    @Loader(QuotationUserLoaderFactory) units: QuotationUserLoader,
  ) {
    const result = await units.load(updatedBy);
    return result?.values || null;
  }

  @ResolveField(() => User, { nullable: true })
  async deletedBy(
    @Parent() { deletedBy }: User,
    @Loader(QuotationUserLoaderFactory) units: QuotationUserLoader,
  ) {
    if (!deletedBy) {
      return null;
    }

    const result = await units.load(deletedBy);
    return result?.values || null;
  }
}
