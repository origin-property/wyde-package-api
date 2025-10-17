import { Base } from '@/shared/@types/base';
import { ProductItemType } from '@/shared/enums/product.enum';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class QuotationItem extends Base {
  @Field(() => ID)
  id: string;

  @Field(() => ProductItemType, {
    defaultValue: ProductItemType.PRODUCT,
    description: 'ประเภทสินค้า',
  })
  productType: ProductItemType;

  @Field(() => String, { nullable: true, description: 'รหัสใบเสนอราคา' })
  quotationId: string;

  @Field(() => String, { nullable: true, description: 'รหัสรายการสินค้า' })
  productId: string;

  @Field(() => Int, { defaultValue: 0, description: 'จำนวนสินค้า' })
  quantity: number;

  @Field(() => String, { nullable: true, description: 'ชื่อสินค้า' })
  productName: string;

  @Field(() => String, { nullable: true, description: 'คำอธิบายสินค้า' })
  productDescription: string;

  @Field(() => String, { nullable: true, description: 'SKU สินค้า' })
  sku: string;

  @Field(() => Float, { defaultValue: 0.0, description: 'ราคาขายสินค้า' })
  sellingPrice: number;

  @Field(() => Float, { defaultValue: 0.0, description: 'ราคางบประมาณสินค้า' })
  budgetPrice: number;

  @Field(() => Float, { nullable: true, description: 'ราคาพิเศษ' })
  specialPrice: number;

  @Field(() => Float, { defaultValue: 0.0, description: 'ราคา/หน่วย' })
  unitPrice: number;

  @Field(() => Float, { defaultValue: 0.0, description: 'ราคารวม' })
  totalPrice: number;
}
