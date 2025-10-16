import { registerEnumType } from '@nestjs/graphql';

export enum QuotationStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

registerEnumType(QuotationStatus, {
  name: 'QuotationStatus',
  description: 'สถานะใบเสนอราคา',
  valuesMap: {
    PENDING: {
      description: 'รอการยืนยัน',
    },
    PAID: {
      description: 'ชำระเงินแล้ว',
    },
    CANCELLED: {
      description: 'ยกเลิก',
    },
  },
});
