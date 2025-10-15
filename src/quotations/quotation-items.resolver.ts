import { ProductByIdLoader } from '@/products/dataloaders/product-by-id.loader';
import { ProductModel } from '@/products/entities/product.entity';
import { ProductVariantModel } from '@/products/entities/productVariant.entity';
import { ProductVariantLoader } from '@/products/product-variant.loader';
import { CurrentUser } from '@/shared/decorators/decorators';
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
import { CreateQuotationItemInput } from './dto/create-quotation-item.input';
import { UpdateQuotationItemInput } from './dto/update-quotation-item.input';
import { QuotationItem } from './entities/quotation-item.entity';
import { Quotation } from './entities/quotation.entity';
import { QuotationItemsService } from './quotation-items.service';
import { QuotationLoader } from './quotation.loader';

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
    @Loader(ProductByIdLoader) loader: DataLoader<string, ProductModel>,
  ) {
    return productId ? loader.load(productId) : null;
  }

  @ResolveField(() => ProductVariantModel, {
    description: 'รายการสินค้า',
  })
  async productVariant(
    @Parent() { productVariantId }: QuotationItem,
    @Loader(ProductVariantLoader)
    loader: DataLoader<string, ProductVariantModel>,
  ) {
    return loader.load(productVariantId);
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
