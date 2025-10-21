import { CurrentUser } from '@/shared/decorators/decorators';
import { Roles } from '@/shared/decorators/roles.decorator';
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
import { PromotionPaginateDto } from './dto/promotion-paginate.dto';
import { PromotionDto } from './dto/promotion.dto';
import { CreatePromotionInput } from './input/create-promotion.input';
import { SearchPromotionArgs } from './input/search-promotion.agrs';
import { UpdatePromotionInput } from './input/update-promotion.input';
import { PromotionsService } from './promotions.service';
import {
  PromotionUserLoader,
  PromotionUserLoaderFactory,
} from './PromotionsUserLoader.factory';

@Resolver(() => PromotionDto)
export class PromotionsResolver {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Roles(['admin'])
  @Mutation(() => PromotionDto)
  async createPromotion(
    @Args('createPromotionInput') createPromotionInput: CreatePromotionInput,
    @CurrentUser() user: User,
  ) {
    return this.promotionsService.create(createPromotionInput, user.id);
  }

  @Query(() => PromotionPaginateDto, { name: 'promotions' })
  async findAll(@Args() searchPromotionArgs: SearchPromotionArgs) {
    return this.promotionsService.searchWithPaginate(searchPromotionArgs);
  }

  @Query(() => PromotionDto, { name: 'promotion' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.promotionsService.findOne(id);
  }

  @Roles(['admin'])
  @Mutation(() => PromotionDto)
  async updatePromotion(
    @Args('updatePromotionInput') updatePromotionInput: UpdatePromotionInput,
    @CurrentUser() user: User,
  ) {
    return this.promotionsService.update(
      updatePromotionInput.id,
      updatePromotionInput,
      user.id,
    );
  }

  @Roles(['admin'])
  @Mutation(() => PromotionDto)
  async updateActivePromotion(
    @Args('id', { type: () => ID }) id: string,
    @Args('isActive', { type: () => Boolean }) isActive: boolean,
    @CurrentUser() user: User,
  ) {
    return this.promotionsService.updateActive(id, isActive, user.id);
  }

  @Roles(['admin'])
  @Mutation(() => Boolean)
  async removePromotion(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ) {
    return this.promotionsService.remove(id, user.id);
  }

  @ResolveField(() => User, { nullable: true })
  async createdBy(
    @Parent() { createdBy }: PromotionDto,
    @Loader(PromotionUserLoaderFactory) userLoader: PromotionUserLoader,
  ) {
    const result = await userLoader.load(createdBy);
    return result?.values || null;
  }

  @ResolveField(() => User, { nullable: true })
  async updatedBy(
    @Parent() { updatedBy }: PromotionDto,
    @Loader(PromotionUserLoaderFactory) userLoader: PromotionUserLoader,
  ) {
    const result = await userLoader.load(updatedBy);
    return result?.values || null;
  }

  @ResolveField(() => User, { nullable: true })
  async deletedBy(
    @Parent() { deletedBy }: PromotionDto,
    @Loader(PromotionUserLoaderFactory) userLoader: PromotionUserLoader,
  ) {
    if (!deletedBy) {
      return null;
    }

    const result = await userLoader.load(deletedBy);
    return result?.values || null;
  }
}
