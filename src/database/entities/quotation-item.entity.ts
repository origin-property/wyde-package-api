import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { BaseEntity } from './base';
import { ProductVariant } from './product-variant.entity';
import { Product } from './product.entity';
import { Quotation } from './quotation.entity';

@Entity()
export class QuotationItem extends BaseEntity {
  @PrimaryColumn({
    default: () => 'uuidv7()',
  })
  id: string;

  @Column({ name: 'quotation_id' })
  quotationId: string;

  @ManyToOne(() => Quotation, (quotation) => quotation.items, {
    orphanedRowAction: 'soft-delete',
  })
  @JoinColumn({ name: 'quotation_id' })
  quotation: Relation<Quotation>;

  @Column({ name: 'product_variant_id' })
  productVariantId: string;

  @ManyToOne(() => ProductVariant)
  @JoinColumn({ name: 'product_variant_id' })
  productVariant: Relation<ProductVariant>;

  @Column({ name: 'product_id', nullable: true })
  productId: string;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product: Relation<Product>;

  @Column({
    name: 'quantity',
    type: 'integer',
    comment: 'จำนวนสินค้า',
    default: 0,
  })
  quantity: number;

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
