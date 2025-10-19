import { Base } from '@/shared/@types/base';
import { PromotionKind, PromotionType } from '@/shared/enums/promotion.enum';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('QuotationPromotion')
export class QuotationPromotionDto extends Base {
  @Field(() => ID)
  id: string;

  @Field({ description: 'รหัสใบเสนอราคา' })
  quotationId: string;

  @Field({ description: 'รหัสโปรโมชั่น' })
  promotionId: string;

  @Field(() => PromotionKind, {
    defaultValue: PromotionKind.VOUCHER,
    description: 'ประเภทโปรโมชั่น: discount หรือ voucher',
  })
  kind: PromotionKind;

  @Field(() => String, {
    description: 'รหัสโค้ด เช่น WY001, Discount100',
  })
  code: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => PromotionType, { defaultValue: PromotionType.FIXED_AMOUNT })
  type: PromotionType;

  @Field(() => Float, {
    defaultValue: 0,
    description: 'ค่าลด เช่น 10% หรือ 100 บาท',
  })
  value: number;
}
