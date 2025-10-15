import { QuotationItem } from '@/quotations/entities/quotation-item.entity';
import { InputType, OmitType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateQuotationItemInput extends PartialType(
  OmitType(
    QuotationItem,
    ['id', 'quotationId', 'createdAt', 'updatedAt', 'deletedAt'],
    InputType,
  ),
) {}
