import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { ProductItemType } from '../../shared/enums/product.enum';
import { BaseEntity } from './base';
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
    enum: ProductItemType,
    default: ProductItemType.PRODUCT,
    comment: 'ประเภทสินค้า',
  })
  productType: ProductItemType;

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

  @Column({
    name: 'quantity',
    type: 'integer',
    comment: 'จำนวนสินค้า',
    default: 0,
  })
  quantity: number;

  @Column({
    name: 'product_name',
    nullable: true,
    comment: 'ชื่อสินค้า',
  })
  productName: string;

  @Column({
    name: 'product_description',
    nullable: true,
    comment: 'คำอธิบายสินค้า',
  })
  productDescription: string;

  @Column({
    name: 'sku',
    nullable: true,
    comment: 'SKU สินค้า',
  })
  sku: string;

  @Column({
    name: 'selling_price',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0.0,
    comment: 'ราคาขายสินค้า',
  })
  sellingPrice: number;

  @Column({
    name: 'budget_price',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0.0,
    comment: 'ราคางบประมาณสินค้า',
  })
  budgetPrice: number;

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
