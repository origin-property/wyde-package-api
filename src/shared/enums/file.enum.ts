import { registerEnumType } from '@nestjs/graphql';

export enum AttachmentType {
  MODEL = 'MODEL',
  SIGNATURE = 'SIGNATURE',
  PAYMENT = 'PAYMENT',
  QUOTATION = 'QUOTATION',
}

registerEnumType(AttachmentType, {
  name: 'AttachmentType',
  description: 'ประเภทในดึงไฟล์จากฐานข้อมูล เช่น ลายเซ็น, รูปชำระเงิน',
  valuesMap: {
    MODEL: {
      description: 'รูปภาพรูปแบบตัวอย่าง',
    },
    SIGNATURE: {
      description: 'ลายเซ็น',
    },
    PAYMENT: {
      description: 'รูปชำระเงิน',
    },
    QUOTATION: {
      description: 'ใบเสนอราคา',
    },
  },
});
