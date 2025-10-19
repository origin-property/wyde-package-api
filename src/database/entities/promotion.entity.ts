import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import {
  PromotionKind,
  PromotionType,
} from '../../shared/enums/promotion.enum';
import { BaseEntity } from './base';
import { QuotationPromotion } from './quotation-promotion.entity';

@Entity()
@Index(['code'], { unique: true })
export class Promotion extends BaseEntity {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'uuidv7()',
  })
  id: string;

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
    unique: true,
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

  @Column({
    name: 'start_at',
    type: 'timestamptz',
  })
  startAt: Date;

  @Column({
    name: 'end_at',
    type: 'timestamptz',
    nullable: true,
  })
  endAt: Date;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @Column({
    name: 'usage_limit',
    type: 'int',
    nullable: true,
    comment: 'จำกัดจำนวนครั้งรวมทั้งหมด',
  })
  usageLimit: number;

  @Column({
    name: 'used_count',
    type: 'int',
    default: 0,
  })
  usedCount: number;

  @Column({
    name: 'per_user_limit',
    type: 'int',
    nullable: true,
    comment: 'จำกัดการใช้งานต่อผู้ใช้',
  })
  perUserLimit: number;

  @Column({
    name: 'min_order_total',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    comment: 'ยอดสั่งซื้อขั้นต่ำ',
  })
  minOrderTotal: number;

  @Column({
    name: 'max_discount_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    comment: 'ส่วนลดสูงสุด (สำหรับ percentage)',
  })
  maxDiscountAmount: number;

  @OneToMany(() => QuotationPromotion, (item) => item.promotion)
  promotions: Relation<QuotationPromotion[]>;
}
