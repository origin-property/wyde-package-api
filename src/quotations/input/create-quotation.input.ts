import { CreateFileInput } from '@/files/input/create-file.input';
import { Quotation } from '@/quotations/dto/quotation.dto';
import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateQuotationItemInput } from './create-quotation-item.input';
import { CreateQuotationPromotionInput } from './create-quotation-promotion.input';

@InputType()
export class CreateQuotationInput extends PartialType(
  OmitType(
    Quotation,
    ['id', 'date', 'code', 'createdAt', 'updatedAt', 'deletedAt'],
    InputType,
  ),
) {
  @Field(() => [CreateQuotationItemInput], { description: 'รายการสินค้า' })
  items: CreateQuotationItemInput[];

  @Field(() => [CreateQuotationPromotionInput], {
    nullable: true,
    description: 'รายการโปรโมชั่น',
  })
  promotions: CreateQuotationPromotionInput[];

  @Field(() => CreateFileInput, {
    description: 'ข้อมูลไฟล์ลายเซ็นลูกค้า',
    nullable: true,
  })
  signatureFile: CreateFileInput;
}
