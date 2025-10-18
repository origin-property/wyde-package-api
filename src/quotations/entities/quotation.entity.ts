import { Base } from '@/shared/@types/base';
import { QuotationStatus } from '@/shared/enums/quotation.enum';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Quotation extends Base {
  @Field(() => ID)
  id: string;

  @Field(() => QuotationStatus, {
    defaultValue: QuotationStatus.PENDING,
    description: 'สถานะใบเสนอราคา',
  })
  status: QuotationStatus;

  @Field(() => Date, { description: 'วันที่ใบเสนอราคา' })
  date: Date;

  @Field(() => String, { description: 'รหัสใบเสนอราคา' })
  code: string;

  @Field(() => String, { nullable: true, description: 'ชื่อลูกค้า' })
  customerFirstName: string;

  @Field(() => String, { nullable: true, description: 'นามสกุลลูกค้า' })
  customerLastName: string;

  @Field(() => String, { nullable: true, description: 'หมายเลขโทรศัพท์ลูกค้า' })
  customerPhone: string;

  @Field(() => String, { nullable: true, description: 'อีเมลลูกค้า' })
  customerEmail: string;

  @Field(() => String, { nullable: true, description: 'ที่อยู่ลูกค้า' })
  customerAddress: string;

  @Field(() => String, { description: 'รหัสโครงการ' })
  projectId: string;

  @Field(() => String, { description: 'รหัสยูนิต' })
  unitId: string;

  @Field(() => String, { description: 'หมายเลขยูนิต' })
  unitNumber: string;
}
