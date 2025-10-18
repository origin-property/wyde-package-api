import { registerEnumType } from '@nestjs/graphql';

export enum PromotionType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
}

registerEnumType(PromotionType, {
  name: 'PromotionType',
});

export enum PromotionKind {
  DISCOUNT = 'DISCOUNT', // ส่วนลดระบบ
  VOUCHER = 'VOUCHER', // voucher ที่ต้องกรอกโค้ด
}

registerEnumType(PromotionKind, {
  name: 'PromotionKind',
});
