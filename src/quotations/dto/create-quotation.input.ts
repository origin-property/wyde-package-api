import { Quotation } from '@/quotations/entities/quotation.entity';
import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateQuotationItemInput } from './create-quotation-item.input';

@InputType()
export class CreateQuotationInput extends PartialType(
  OmitType(Quotation, ['id', 'createdAt', 'updatedAt', 'deletedAt'], InputType),
) {
  @Field(() => [CreateQuotationItemInput], { description: 'รายการสินค้า' })
  items: CreateQuotationItemInput[];
}
