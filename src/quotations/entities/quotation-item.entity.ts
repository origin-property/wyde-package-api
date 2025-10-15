import { Base } from '@/shared/@types/base';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class QuotationItem extends Base {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true, description: 'รหัสใบเสนอราคา' })
  quotationId: string;

  @Field(() => String, { nullable: true, description: 'รหัสรายการสินค้า' })
  productVariantId: string;

  @Field(() => String, { nullable: true, description: 'รหัสสินค้า' })
  productId: string;

  @Field(() => Int, { defaultValue: 0, description: 'จำนวนสินค้า' })
  quantity: number;

  @Field(() => Float, { defaultValue: 0.0, description: 'ราคา/หน่วย' })
  unitPrice: number;

  @Field(() => Float, { defaultValue: 0.0, description: 'ราคารวม' })
  totalPrice: number;
}
