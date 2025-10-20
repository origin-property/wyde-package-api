import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { PromotionDto } from '../dto/promotion.dto';

@InputType()
export class CreatePromotionInput extends PartialType(
  OmitType(
    PromotionDto,
    ['id', 'createdAt', 'updatedAt', 'deletedAt'],
    InputType,
  ),
) {}
