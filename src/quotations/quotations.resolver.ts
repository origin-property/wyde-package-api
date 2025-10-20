import { File } from '@/files/entities/file.entity';
import { Project } from '@/projects/dto/project.dto';
import { Unit } from '@/projects/dto/unit.dto';
import { CurrentUser } from '@/shared/decorators/decorators';
import { Roles } from '@/shared/decorators/roles.decorator';
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
import { PackageProjectLoaderFactory } from '../products/loader/PackageProjectLoader.factory';
import { QuotationItem } from './dto/quotation-item.dto';
import { QuotationPaginate } from './dto/quotation-paginate.dto';
import { QuotationPromotionDto } from './dto/quotation-promotion.dto';
import { Quotation } from './dto/quotation.dto';
import { CreateQuotationInput } from './input/create-quotation.input';
import { SearchQuotationArgs } from './input/search-quotation.agrs';
import { UpdateQuotationInput } from './input/update-quotation.input';
import {
  QuotationFileLoader,
  QuotationFileLoaderFactory,
} from './loader/QuotationFileLoader.factory';
import {
  QuotationItemLoader,
  QuotationItemLoaderFactory,
} from './loader/QuotationItemLoader.factory';
import { QuotationProjectLoader } from './loader/QuotationProjectLoader.factory';
import {
  QuotationPromotionDiscountPriceLoader,
  QuotationPromotionDiscountPriceLoaderFactory,
} from './loader/QuotationPromotionDiscountPriceLoader.factory';
import {
  QuotationPromotionLoader,
  QuotationPromotionLoaderFactory,
} from './loader/QuotationPromotionLoader.factory';
import {
  QuotationPromotionVoucherPriceLoader,
  QuotationPromotionVoucherPriceLoaderFactory,
} from './loader/QuotationPromotionVoucherPriceLoader.factory';
import { QuotationsService } from './quotations.service';
import {
  QuotationUnitLoader,
  QuotationUnitLoaderFactory,
} from './loader/QuotationUnitLoader.factory';
import {
  QuotationUserLoader,
  QuotationUserLoaderFactory,
} from './loader/QuotationUserLoader.factory';

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
  async discountPrice(
    @Parent() { id }: Quotation,
    @Loader(QuotationPromotionDiscountPriceLoaderFactory)
    loader: QuotationPromotionDiscountPriceLoader,
  ) {
    const discountPrice = await loader.load(id);
    if (!discountPrice) return 0;
    return discountPrice?.value ?? 0;
  }

  @ResolveField(() => Float, { defaultValue: 0, description: 'voucher wyde' })
  async voucherPrice(
    @Parent() { id }: Quotation,
    @Loader(QuotationPromotionVoucherPriceLoaderFactory)
    loader: QuotationPromotionVoucherPriceLoader,
  ) {
    const voucherPrice = await loader.load(id);
    if (!voucherPrice) return 0;
    return voucherPrice?.value ?? 0;
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
