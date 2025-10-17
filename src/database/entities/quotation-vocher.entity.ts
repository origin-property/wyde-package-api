import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base';

export enum QuotationVocherType {
  SPECIAL = 'SPECIAL',
  VOUCHER = 'VOUCHER',
}

@Entity()
export class QuotationVocher extends BaseEntity {
  @PrimaryColumn({
    default: () => 'uuidv7()',
  })
  id: string;

  @Column({
    name: 'ref_id',
    type: 'varchar',
    nullable: true,
  })
  refId: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: QuotationVocherType,
    nullable: true,
    comment: 'ประเภทส่วนลด',
  })
  type: QuotationVocherType;

  @Column({
    name: 'code',
    type: 'varchar',
    nullable: true,
    comment: 'รหัสส่วนลดพิเศษ',
  })
  code: string;

  @Column({
    name: 'discount',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0.0,
    comment: 'ส่วนลดพิเศษ',
  })
  discount: number;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
    comment: 'คำอธิบายส่วนลดพิเศษ',
  })
  description: string;
}
