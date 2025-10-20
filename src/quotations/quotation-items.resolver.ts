import { ProductModel } from '@/products/dto/product.dto';
import { ProductVariantModel } from '@/products/dto/productVariant.dto';
import { CurrentUser } from '@/shared/decorators/decorators';
import { User } from '@/users/dto/user.dto';
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
import { QuotationItem } from './dto/quotation-item.dto';
import { Quotation } from './dto/quotation.dto';
import { CreateQuotationItemInput } from './input/create-quotation-item.input';
import { UpdateQuotationItemInput } from './input/update-quotation-item.input';
import {
  ItemQuotationLoader,
  ItemQuotationLoaderFactory,
} from './loader/ItemQuotationLoader.factory';
import {
  QuotationItemPackageLoader,
  QuotationItemPackageLoaderFactory,
} from './loader/QuotationItemPackageLoader.factory';
import {
  QuotationProductLoader,
  QuotationProductLoaderFactory,
} from './loader/QuotationProductLoader.factory';
import {
  QuotationUserLoader,
  QuotationUserLoaderFactory,
} from './loader/QuotationUserLoader.factory';
import {
  QuotationVariantLoader,
  QuotationVariantLoaderFactory,
} from './loader/QuotationVariantLoader.factory';
import { QuotationItemsService } from './quotation-items.service';

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
    @Loader(ItemQuotationLoaderFactory) loader: ItemQuotationLoader,
  ) {
    const result = await loader.load(quotationId);
    return result?.values;
  }

  @ResolveField(() => ProductModel, { nullable: true, description: 'สินค้า' })
  async product(
    @Parent() { productId }: QuotationItem,
    @Loader(QuotationProductLoaderFactory) loader: QuotationProductLoader,
  ) {
    if (!productId) {
      return null;
    }

    const result = await loader.load(productId);
    return result?.values?.[0];
  }

  @ResolveField(() => ProductVariantModel, {
    nullable: true,
    description: 'รายการสินค้า',
  })
  async productVariant(
    @Parent() { productVariantId }: QuotationItem,
    @Loader(QuotationVariantLoaderFactory) loader: QuotationVariantLoader,
  ) {
    if (!productVariantId) return;
    const result = await loader.load(productVariantId);
    return result?.values;
  }

  @ResolveField(() => [QuotationItem], {
    nullable: true,
    description: 'รายการสินค้า',
  })
  async packageItems(
    @Parent() { id }: QuotationItem,
    @Loader(QuotationItemPackageLoaderFactory)
    loader: QuotationItemPackageLoader,
  ) {
    const result = await loader.load(id);
    return result?.values || [];
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
