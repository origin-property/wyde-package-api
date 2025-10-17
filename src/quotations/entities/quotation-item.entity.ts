import { Base } from '@/shared/@types/base';
import { QuotationProductType } from '@/shared/enums/quotation.enum';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class QuotationItem extends Base {
  @Field(() => ID)
  id: string;

  @Field(() => QuotationProductType, {
    defaultValue: QuotationProductType.PRODUCT,
    description: 'ประเภทสินค้า',
  })
  productType: QuotationProductType;

  @Field(() => String, { nullable: true, description: 'รหัสใบเสนอราคา' })
  quotationId: string;

  @Field(() => String, { nullable: true, description: 'รหัสรายการสินค้า' })
  productId: string;

  @Field(() => String, { nullable: true, description: 'รหัสชุดสินค้า' })
  packageId: string;

  @Field(() => Int, { defaultValue: 0, description: 'จำนวนสินค้า' })
  quantity: number;

  @Field(() => Float, { nullable: true, description: 'ราคาพิเศษ' })
  specialPrice: number;

  @Field(() => Float, { defaultValue: 0.0, description: 'ราคา/หน่วย' })
  unitPrice: number;

  @Field(() => Float, { defaultValue: 0.0, description: 'ราคารวม' })
  totalPrice: number;
}
