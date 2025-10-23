import { Base } from '@/shared/@types/base';
import { QuotationStatus } from '@/shared/enums/quotation.enum';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

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
  firstName: string;

  @Field(() => String, { nullable: true, description: 'นามสกุลลูกค้า' })
  lastName: string;

  @Field(() => String, { nullable: true, description: 'หมายเลขโทรศัพท์ลูกค้า' })
  telephone: string;

  @Field(() => String, { nullable: true, description: 'อีเมลลูกค้า' })
  email: string;

  @Field(() => String, { nullable: true, description: 'ที่อยู่ลูกค้า' })
  address: string;

  @Field(() => String, { description: 'รหัสยูนิต' })
  unitId: string;

  @Field(() => Float, { nullable: true, description: 'มัดจำ' })
  deposit: number;

  @Field(() => Float, { nullable: true, description: 'ชำระก่อนตกแต่ง' })
  prePayment: number;

  @Field(() => Float, { nullable: true, description: 'ชำระเมื่อตกแต่งเสร็จ' })
  postPayment: number;

  @Field(() => Date, {
    nullable: true,
    description: 'รับชำระก่อนเริ่มงาน วันที่',
  })
  beforeStartPaymentDate: Date;

  @Field(() => Date, {
    nullable: true,
    description: 'ผู้ว่าจ้างรับมอบห้องจากโครงการ วันที่',
  })
  projectManagerReceiveDate: Date;

  @Field(() => Int, {
    nullable: true,
    description: 'บริษัทฯ ประเมินระยะเวลาตกแต่ง',
  })
  evaluationDuration: number;

  @Field(() => Date, {
    nullable: true,
    description: 'คาดการณ์เริ่มตกแต่งวันที่',
  })
  estimatedStartDate: Date;

  @Field(() => String, { nullable: true, description: 'ผู้เสนอราคา' })
  quotationOfferBy: string;

  @Field(() => Date, { nullable: true, description: 'วันที่เสนอราคา' })
  quotationOfferDate: Date;

  @Field(() => String, { nullable: true, description: 'ผู้ว่าจ้าง' })
  employerName: string;

  @Field(() => Date, { nullable: true, description: 'วันที่ผู้ว่าจ้าง' })
  employerDate: Date;

  @Field(() => Date, { nullable: true, description: 'วันที่ลายเซ็น' })
  signatureDate: Date;

  @Field(() => Date, { nullable: true, description: 'วันที่ชำระเงิน' })
  paymentDate: Date;
}
