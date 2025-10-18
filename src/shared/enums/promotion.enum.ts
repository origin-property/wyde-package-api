import { registerEnumType } from '@nestjs/graphql';

export enum PromotionType {
  PERCENTAGE = 'percentage',
  FIXED_AMOUNT = 'fixed_amount',
}

registerEnumType(PromotionType, {
  name: 'PromotionType',
});

export enum PromotionKind {
  DISCOUNT = 'discount', // ส่วนลดระบบ
  VOUCHER = 'voucher', // voucher ที่ต้องกรอกโค้ด
}

registerEnumType(PromotionKind, {
  name: 'PromotionKind',
});
