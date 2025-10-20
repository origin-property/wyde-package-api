import { ProductModel } from '@/products/dto/product.dto';
import { ProductVariantModel } from '@/products/dto/productVariant.dto';
import { CurrentUser } from '@/shared/decorators/decorators';
import { User } from '@/users/entities/user.entity';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Loader as Loader2 } from '@strv/nestjs-dataloader';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { CreateQuotationItemInput } from './input/create-quotation-item.input';
import { UpdateQuotationItemInput } from './input/update-quotation-item.input';
import { QuotationItem } from './dto/quotation-item.dto';
import { Quotation } from './dto/quotation.dto';
import {
  QuotationProductLoader,
  QuotationProductLoaderFactory,
} from './loader/QuotationProductLoader.factory';
import {
  QuotationVariantLoader,
  QuotationVariantLoaderFactory,
} from './loader/QuotationVariantLoader.factory';
import { QuotationItemsService } from './quotation-items.service';
import { QuotationLoader } from './quotation.loader';
import {
  QuotationItemPackageLoader,
  QuotationItemPackageLoaderFactory,
} from './QuotationItemPackageLoader.factory';
import {
  QuotationUserLoader,
  QuotationUserLoaderFactory,
} from './QuotationUserLoader.factory';

@Resolver(() => QuotationItem)
export class QuotationItemsResolver {
  constructor(private quotationItemsService: QuotationItemsService) {}

  @Mutation(() => QuotationItem)
  async createQuotationItem(
    @Args('createQuotationItemInput')
    createQuotationItemInput: CreateQuotationItemInput,
    @CurrentUser() user: User,
  ) {
    return this.quotationItemsService.create(createQuotationItemInput, user.id);
  }

  @Query(() => [QuotationItem], { name: 'quotationItems' })
  async findAll() {
    return this.quotationItemsService.findAll();
  }

  @Query(() => QuotationItem, { name: 'quotationItem' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.quotationItemsService.findOne(id);
  }

  @Mutation(() => QuotationItem)
  async updateQuotationItem(
    @Args('updateQuotationItemInput')
    updateQuotationItemInput: UpdateQuotationItemInput,
    @CurrentUser() user: User,
  ) {
    return this.quotationItemsService.update(updateQuotationItemInput, user.id);
  }

  @Mutation(() => Boolean)
  async removeQuotationItem(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ) {
    return this.quotationItemsService.remove(id, user.id);
  }

  @ResolveField(() => Quotation, { nullable: true, description: 'ใบเสนอราคา' })
  async quotation(
    @Parent() { quotationId }: QuotationItem,
    @Loader(QuotationLoader) loader: DataLoader<string, Quotation>,
  ) {
    return loader.load(quotationId);
  }

  @ResolveField(() => ProductModel, { nullable: true, description: 'สินค้า' })
  async product(
    @Parent() { productId }: QuotationItem,
    @Loader(QuotationProductLoaderFactory) loader: QuotationProductLoader,
  ) {
    const result = await loader.load(productId);
    return result?.values;
  }

  @ResolveField(() => ProductVariantModel, {
    nullable: true,
    description: 'รายการสินค้า',
  })
  async productVariant(
    @Parent() { productVariantId }: QuotationItem,
    @Loader2(QuotationVariantLoaderFactory) loader: QuotationVariantLoader,
  ) {
    const result = await loader.load(productVariantId);
    return result?.values;
  }

  @ResolveField(() => [QuotationItem], {
    nullable: true,
    description: 'รายการสินค้า',
  })
  async packageItems(
    @Parent() { id }: QuotationItem,
    @Loader2(QuotationItemPackageLoaderFactory)
    loader: QuotationItemPackageLoader,
  ) {
    const result = await loader.load(id);
    return result?.values || [];
  }

  @ResolveField(() => User, { nullable: true })
  async createdBy(
    @Parent() { createdBy }: User,
    @Loader2(QuotationUserLoaderFactory) units: QuotationUserLoader,
  ) {
    const result = await units.load(createdBy);
    return result?.values || null;
  }

  @ResolveField(() => User, { nullable: true })
  async updatedBy(
    @Parent() { updatedBy }: User,
    @Loader2(QuotationUserLoaderFactory) units: QuotationUserLoader,
  ) {
    const result = await units.load(updatedBy);
    return result?.values || null;
  }

  @ResolveField(() => User, { nullable: true })
  async deletedBy(
    @Parent() { deletedBy }: User,
    @Loader2(QuotationUserLoaderFactory) units: QuotationUserLoader,
  ) {
    if (!deletedBy) {
      return null;
    }

    const result = await units.load(deletedBy);
    return result?.values || null;
  }
}
