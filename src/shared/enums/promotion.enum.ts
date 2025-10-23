import { registerEnumType } from '@nestjs/graphql';

export enum PromotionType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
}

registerEnumType(PromotionType, {
  name: 'PromotionType',
  description: 'ประเภทโปรโมชั่น: percentage หรือ fixed_amount',
  valuesMap: {
    PERCENTAGE: {
      description: 'ส่วนลดเป็นร้อยละ',
    },
    FIXED_AMOUNT: {
      description: 'ส่วนลดเป็นจำนวนเงิน',
    },
  },
});

export enum PromotionKind {
  DISCOUNT = 'DISCOUNT', // ส่วนลดระบบ
  VOUCHER = 'VOUCHER', // voucher ที่ต้องกรอกโค้ด
  CODE = 'CODE', // รหัสโค้ดที่ต้องกรอก
}

registerEnumType(PromotionKind, {
  name: 'PromotionKind',
  description: 'ประเภทโปรโมชั่น: discount, voucher หรือ code',
  valuesMap: {
    DISCOUNT: {
      description: 'ส่วนลด',
    },
    VOUCHER: {
      description: 'voucher',
    },
    CODE: {
      description: 'รหัสโค้ด',
    },
  },
});
