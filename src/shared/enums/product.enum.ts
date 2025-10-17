import { registerEnumType } from '@nestjs/graphql';

export enum ProductItemType {
  PRODUCT = 'PRODUCT',
  PACKAGE = 'PACKAGE',
}

registerEnumType(ProductItemType, {
  name: 'ProductItemType',
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
