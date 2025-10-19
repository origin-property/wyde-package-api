import { QuotationItem } from '@/quotations/entities/quotation-item.entity';
import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateQuotationItemInput extends PartialType(
  OmitType(
    QuotationItem,
    ['id', 'parentId', 'quotationId', 'createdAt', 'updatedAt', 'deletedAt'],
    InputType,
  ),
) {
  @Field(() => [CreateQuotationItemInput], {
    nullable: true,
    description: 'รายการสินค้าหลัก',
  })
  items: CreateQuotationItemInput[];
}
