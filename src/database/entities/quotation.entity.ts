import { Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { QuotationStatus } from '../../shared/enums/quotation.enum';
import { BaseEntity } from './base';
import { QuotationItem } from './quotation-item.entity';
import { QuotationVocher } from './quotation-vocher.entity';

@Entity()
export class Quotation extends BaseEntity {
  @PrimaryColumn({
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
    name: 'customer_first_name',
    nullable: true,
    comment: 'ชื่อลูกค้า',
  })
  customerFirstName: string;

  @Column({
    name: 'customer_last_name',
    nullable: true,
    comment: 'นามสกุลลูกค้า',
  })
  customerLastName: string;

  @Column({
    name: 'customer_phone',
    nullable: true,
    comment: 'หมายเลขโทรศัพท์ลูกค้า',
  })
  customerPhone: string;

  @Column({ name: 'customer_email', nullable: true, comment: 'อีเมลลูกค้า' })
  customerEmail: string;

  @Column({
    name: 'customer_address',
    type: 'text',
    nullable: true,
    comment: 'ที่อยู่ลูกค้า',
  })
  customerAddress: string;

  @Column({ name: 'project_id', comment: 'รหัสโครงการ' })
  projectId: string;

  @Column({ name: 'unit_id', comment: 'รหัสยูนิต' })
  unitId: string;

  @Column({ name: 'unit_number', comment: 'หมายเลขยูนิต' })
  unitNumber: string;

  @OneToMany(() => QuotationItem, (item) => item.quotation, {
    cascade: true,
  })
  items: Relation<QuotationItem[]>;

  @OneToMany(() => QuotationVocher, (vocher) => vocher.quotation, {
    cascade: true,
  })
  vochers: Relation<QuotationVocher[]>;
}
