import { CurrentUser } from '@/shared/decorators/decorators';
import { Roles } from '@/shared/decorators/roles.decorator';
import { User } from '@/users/entities/user.entity';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePromotionInput } from './dto/create-promotion.input';
import { UpdatePromotionInput } from './dto/update-promotion.input';
import { PromotionDto } from './entities/promotion.dto';
import { PromotionsService } from './promotions.service';

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

  @Query(() => [PromotionDto], { name: 'promotions' })
  async findAll() {
    return this.promotionsService.findAll();
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
  async removePromotion(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ) {
    return this.promotionsService.remove(id, user.id);
  }
}
