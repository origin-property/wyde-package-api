import { Base } from '@/shared/@types/base';
import { PromotionKind, PromotionType } from '@/shared/enums/promotion.enum';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Promotion')
export class PromotionDto extends Base {
  @Field(() => ID)
  id: string;

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

  @Field(() => Date)
  startAt: Date;

  @Field(() => Date, {
    nullable: true,
  })
  endAt: Date;

  @Field(() => Boolean, {
    defaultValue: true,
  })
  isActive: boolean;

  @Field(() => Int, {
    nullable: true,
    description: 'จำกัดจำนวนครั้งรวมทั้งหมด',
  })
  usageLimit: number;

  @Field(() => Int, { defaultValue: 0 })
  usedCount: number;

  @Field(() => Int, {
    nullable: true,
    description: 'จำกัดการใช้งานต่อผู้ใช้',
  })
  perUserLimit: number;

  @Field(() => Float, {
    nullable: true,
    description: 'ยอดสั่งซื้อขั้นต่ำ',
  })
  minOrderTotal: number;

  @Field(() => Float, {
    nullable: true,
    description: 'ส่วนลดสูงสุด (สำหรับ percentage)',
  })
  maxDiscountAmount: number;
}
