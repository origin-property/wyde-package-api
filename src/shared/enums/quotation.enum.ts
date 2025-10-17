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

export enum QuotationProductType {
  PRODUCT = 'PRODUCT',
  PACKAGE = 'PACKAGE',
}

registerEnumType(QuotationProductType, {
  name: 'QuotationProductType',
  description: 'ประเภทสินค้า',
  valuesMap: {
    PRODUCT: {
      description: 'สินค้า',
    },
    PACKAGE: {
      description: 'ชุดสินค้า',
    },
  },
});
