import { PackageItem } from '@/packages/entities/package.entity';
import { PackageItemLoader } from '@/packages/package.loader';
import { ProductVariantModel } from '@/products/entities/productVariant.entity';
import { ProductVariantLoader } from '@/products/product-variant.loader';
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
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { CreateQuotationItemInput } from './dto/create-quotation-item.input';
import { UpdateQuotationItemInput } from './dto/update-quotation-item.input';
import { QuotationItem } from './entities/quotation-item.entity';
import { Quotation } from './entities/quotation.entity';
import { QuotationItemsService } from './quotation-items.service';
import { QuotationLoader } from './quotation.loader';
import { Loader as Loader2 } from '@strv/nestjs-dataloader';
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

  @ResolveField(() => ProductVariantModel, {
    nullable: true,
    description: 'รายการสินค้า',
  })
  async product(
    @Parent() { productId }: QuotationItem,
    @Loader(ProductVariantLoader)
    loader: DataLoader<string, ProductVariantModel>,
  ) {
    return productId ? loader.load(productId) : null;
  }

  @ResolveField(() => PackageItem, {
    nullable: true,
    description: 'รายการชุดสินค้า',
  })
  async package(
    @Parent() { packageId }: QuotationItem,
    @Loader(PackageItemLoader) loader: DataLoader<string, PackageItem>,
  ) {
    return packageId ? loader.load(packageId) : null;
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
