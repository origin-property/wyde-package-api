import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Relation,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { BaseEntity } from './base';
import { ProductVariant } from './product-variant.entity';
import { Product } from './product.entity';

export enum PackageItemType {
  DEFAULT = 'DEFAULT',
  EQUIVALENT = 'EQUIVALENT',
}

@Entity({ name: 'package_item' })
export class PackageItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_id' })
  productId: string;

  @ManyToOne(() => Product, (product) => product.packageItems)
  @JoinColumn({ name: 'product_id' })
  product: Relation<Product>;

  @Column({ name: 'product_variant_id' })
  productVariantId: string;

  @ManyToOne(() => ProductVariant, (variant) => variant.packages)
  @JoinColumn({ name: 'product_variant_id' })
  productVariant: Relation<ProductVariant>;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'special_price' })
  specialPrice: number;

  @Column({ name: 'seq' })
  seq: number;

  @Column({ name: 'package_seq' })
  packageSeq: number;

  @Column({
    name: 'type',
    type: 'enum',
    enum: PackageItemType,
    default: PackageItemType.DEFAULT,
  })
  type: PackageItemType;
}
