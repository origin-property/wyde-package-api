import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { QuotationPromotionDto } from '../entities/quotation-promotion.dto';

@InputType()
export class CreateQuotationPromotionInput extends PartialType(
  OmitType(
    QuotationPromotionDto,
    ['id', 'quotationId', 'createdAt', 'updatedAt', 'deletedAt'],
    InputType,
  ),
) {}
