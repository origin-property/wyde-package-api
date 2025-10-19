import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { PromotionDto } from '../entities/promotion.dto';

@InputType()
export class CreatePromotionInput extends PartialType(
  OmitType(
    PromotionDto,
    ['id', 'createdAt', 'updatedAt', 'deletedAt'],
    InputType,
  ),
) {}
