import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { QuotationProductType } from '../../shared/enums/quotation.enum';
import { BaseEntity } from './base';
import { PackageItem } from './package-item.entity';
import { ProductVariant } from './product-variant.entity';
import { Quotation } from './quotation.entity';

@Entity()
export class QuotationItem extends BaseEntity {
  @PrimaryColumn({
    default: () => 'uuidv7()',
  })
  id: string;

  @Column({
    name: 'product_type',
    type: 'enum',
    enum: QuotationProductType,
    default: QuotationProductType.PRODUCT,
    comment: 'ประเภทสินค้า',
  })
  productType: QuotationProductType;

  @Column({ name: 'quotation_id', comment: 'รหัสใบเสนอราคา' })
  quotationId: string;

  @ManyToOne(() => Quotation, (quotation) => quotation.items, {
    orphanedRowAction: 'soft-delete',
  })
  @JoinColumn({ name: 'quotation_id' })
  quotation: Relation<Quotation>;

  @Column({ name: 'product_id', nullable: true, comment: 'รหัสสินค้า' })
  productId: string;

  @ManyToOne(() => ProductVariant)
  @JoinColumn({ name: 'product_id' })
  product: Relation<ProductVariant>;

  @Column({ name: 'package_id', nullable: true, comment: 'รหัสชุดสินค้า' })
  packageId: string;

  @ManyToOne(() => PackageItem, { nullable: true })
  @JoinColumn({ name: 'package_id' })
  package: Relation<PackageItem>;

  @Column({
    name: 'quantity',
    type: 'integer',
    comment: 'จำนวนสินค้า',
    default: 0,
  })
  quantity: number;

  @Column({
    name: 'special_price',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
    comment: 'ราคาพิเศษ',
  })
  specialPrice: number;

  @Column({
    name: 'unit_price',
    comment: 'ราคา/หน่วย',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0.0,
  })
  unitPrice: number;

  @Column({
    name: 'total_price',
    comment: 'ราคารวม',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0.0,
  })
  totalPrice: number;
}
