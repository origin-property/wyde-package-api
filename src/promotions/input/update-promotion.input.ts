import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreatePromotionInput } from './create-promotion.input';

@InputType()
export class UpdatePromotionInput extends PartialType(CreatePromotionInput) {
  @Field(() => ID)
  id: string;
}
