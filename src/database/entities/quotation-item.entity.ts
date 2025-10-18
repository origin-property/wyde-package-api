import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { ProductItemType } from '../../shared/enums/product.enum';
import { BaseEntity } from './base';
import { ProductVariant } from './product-variant.entity';
import { Product } from './product.entity';
import { Quotation } from './quotation.entity';

@Entity({
  orderBy: {
    id: 'ASC',
  },
})
export class QuotationItem extends BaseEntity {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'uuidv7()',
  })
  id: string;

  @Column({ name: 'quotation_id', comment: 'รหัสใบเสนอราคา', nullable: true })
  quotationId: string;

  @ManyToOne(() => Quotation, (quotation) => quotation.items, {
    nullable: true,
    orphanedRowAction: 'soft-delete',
  })
  @JoinColumn({ name: 'quotation_id' })
  quotation: Relation<Quotation>;

  @Column({
    type: 'uuid',
    name: 'product_id',
    nullable: true,
    comment: 'รหัสสินค้า',
  })
  productId: string;

  @ManyToOne(() => Product, {
    nullable: true,
  })
  @JoinColumn({ name: 'product_id' })
  product: Relation<Product>;

  @Column({
    type: 'uuid',
    name: 'product_variant_id',
    nullable: true,
    comment: 'รหัสรายการสินค้า',
  })
  productVariantId: string;

  @ManyToOne(() => ProductVariant, {
    nullable: true,
  })
  @JoinColumn({ name: 'product_variant_id' })
  variant: Relation<ProductVariant>;

  @Column({
    name: 'product_type',
    type: 'enum',
    enum: ProductItemType,
    default: ProductItemType.PRODUCT,
    comment: 'ประเภทสินค้า',
  })
  productType: ProductItemType;

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
    name: 'quantity',
    type: 'integer',
    comment: 'จำนวนสินค้า',
    default: 0,
  })
  quantity: number;

  @Column({
    name: 'special_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    comment: 'ราคาพิเศษ',
  })
  specialPrice: number;

  @Column({
    name: 'price',
    comment: 'ราคา',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  price: number;

  @Column({
    name: 'parent_id',
    nullable: true,
    comment: 'รหัสรายการสินค้าหลัก',
  })
  parentId: string;

  @ManyToOne(() => QuotationItem, (item) => item.items, {
    orphanedRowAction: 'soft-delete',
  })
  @JoinColumn({ name: 'parent_id' })
  parent: Relation<QuotationItem>;

  @OneToMany(() => QuotationItem, (item) => item.parent, {
    cascade: true,
  })
  items: Relation<QuotationItem[]>;
}
