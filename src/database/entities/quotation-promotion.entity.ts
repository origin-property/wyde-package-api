import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import {
  PromotionKind,
  PromotionType,
} from '../../shared/enums/promotion.enum';
import { BaseEntity } from './base';
import { Promotion } from './promotion.entity';
import { Quotation } from './quotation.entity';

@Entity()
export class QuotationPromotion extends BaseEntity {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'uuidv7()',
  })
  id: string;

  @Column({ name: 'quotation_id', comment: 'รหัสใบเสนอราคา' })
  quotationId: string;

  @ManyToOne(() => Quotation, (quotation) => quotation.promotions, {
    orphanedRowAction: 'soft-delete',
  })
  @JoinColumn({ name: 'quotation_id' })
  quotation: Relation<Quotation>;

  @Column({ name: 'promotion_id', comment: 'รหัสโปรโมชั่น' })
  promotionId: string;

  @ManyToOne(() => Promotion, (promotion) => promotion.promotions, {
    orphanedRowAction: 'soft-delete',
  })
  @JoinColumn({ name: 'promotion_id' })
  promotion: Relation<Promotion>;

  @Column({
    name: 'kind',
    type: 'enum',
    enum: PromotionKind,
    default: PromotionKind.DISCOUNT,
    comment: 'ประเภทโปรโมชั่น: discount หรือ voucher',
  })
  kind: PromotionKind;

  @Column({
    name: 'code',
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: 'รหัสโค้ด เช่น WY001, Discount100',
  })
  code: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'text',
    name: 'description',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: PromotionType,
    default: PromotionType.FIXED_AMOUNT,
  })
  type: PromotionType;

  @Column({
    name: 'value',
    comment: 'ค่าลด เช่น 10% หรือ 100 บาท',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  value: number;
}
