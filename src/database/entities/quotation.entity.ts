import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { QuotationStatus } from '../../shared/enums/quotation.enum';
import { BaseEntity } from './base';
import { QuotationItem } from './quotation-item.entity';
import { QuotationPromotion } from './quotation-promotion.entity';

@Entity()
@Index(['code'])
export class Quotation extends BaseEntity {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'uuidv7()',
  })
  id: string;

  @Column({
    type: 'enum',
    enum: QuotationStatus,
    default: QuotationStatus.PENDING,
  })
  status: QuotationStatus;

  @Column({
    type: 'timestamptz',
    default: () => 'now()',
    comment: 'วันที่ใบเสนอราคา',
  })
  date: Date;

  @Column({ unique: true, comment: 'รหัสใบเสนอราคา' })
  code: string;

  @Column({
    name: 'unit_id',
    comment: 'รหัสยูนิต',
    length: 50,
  })
  unitId: string;

  @Column({
    name: 'first_name',
    nullable: true,
    comment: 'ชื่อลูกค้า',
  })
  firstName: string;

  @Column({
    name: 'last_name',
    nullable: true,
    comment: 'นามสกุลลูกค้า',
  })
  lastName: string;

  @Column({
    name: 'telephone',
    nullable: true,
    comment: 'หมายเลขโทรศัพท์ลูกค้า',
  })
  telephone: string;

  @Column({ name: 'email', nullable: true, comment: 'อีเมลลูกค้า' })
  email: string;

  @Column({
    name: 'address',
    type: 'text',
    nullable: true,
    comment: 'ที่อยู่ลูกค้า',
  })
  address: string;

  @Column({
    name: 'deposit',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    comment: 'มัดจำ',
  })
  deposit: number;

  @Column({
    name: 'pre_payment',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    comment: 'ชำระก่อนตกแต่ง',
  })
  prePayment: number;

  @Column({
    name: 'post_payment',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    comment: 'ชำระเมื่อตกแต่งเสร็จ',
  })
  postPayment: number;

  @Column({
    name: 'before_start_payment_date',
    type: 'timestamptz',
    nullable: true,
    comment: 'รับชำระก่อนเริ่มงาน วันที่',
  })
  beforeStartPaymentDate: Date;

  @Column({
    name: 'project_manager_receive_date',
    type: 'timestamptz',
    nullable: true,
    comment: 'ผู้ว่าจ้างรับมอบห้องจากโครงการ วันที่',
  })
  projectManagerReceiveDate: Date;

  @Column({
    name: 'evaluation_duration',
    type: 'int',
    nullable: true,
    comment: 'บริษัทฯ ประเมินระยะเวลาตกแต่ง',
  })
  evaluationDuration: number;

  @Column({
    name: 'estimated_start_date',
    type: 'timestamptz',
    nullable: true,
    comment: 'คาดการณ์เริ่มตกแต่งวันที่',
  })
  estimatedStartDate: Date;

  @Column({
    name: 'quotation_offer_by',
    type: 'varchar',
    nullable: true,
    comment: 'ผู้เสนอราคา',
  })
  quotationOfferBy: string;

  @Column({
    name: 'quotation_offer_date',
    type: 'timestamptz',
    nullable: true,
    comment: 'วันที่เสนอราคา',
  })
  quotationOfferDate: Date;

  @Column({
    name: 'employer_name',
    type: 'varchar',
    nullable: true,
    comment: 'ผู้ว่าจ้าง',
  })
  employerName: string;

  @Column({
    name: 'employer_date',
    type: 'timestamptz',
    nullable: true,
    comment: 'วันที่ผู้ว่าจ้าง',
  })
  employerDate: Date;

  @Column({
    name: 'signature_date',
    type: 'timestamptz',
    nullable: true,
    comment: 'วันที่ลายเซ็น',
  })
  signatureDate: Date;

  @Column({
    name: 'payment_date',
    type: 'timestamptz',
    nullable: true,
    comment: 'วันที่ชำระเงินใช้ตอนอัพโหลดไฟล์รูปชำระเงิน',
  })
  paymentDate: Date;

  @OneToMany(() => QuotationItem, (item) => item.quotation, {
    cascade: true,
  })
  items: Relation<QuotationItem[]>;

  @OneToMany(() => QuotationPromotion, (item) => item.quotation, {
    cascade: true,
  })
  promotions: Relation<QuotationPromotion[]>;
}
