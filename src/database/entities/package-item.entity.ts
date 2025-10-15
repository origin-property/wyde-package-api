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
import { Package } from './package.entity';

export enum PackageItemType {
  DEFAULT = 'DEFAULT',
  EQUIVALENT = 'EQUIVALENT',
}

@Entity({ name: 'package_item' })
export class PackageItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_variant_id' })
  productVariantId: string;

  @ManyToOne(() => ProductVariant, (variant) => variant.packages)
  @JoinColumn({ name: 'product_variant_id' })
  productVariant: Relation<ProductVariant>;

  @Column({ name: 'package_id' })
  packageId: string;

  @ManyToOne(() => Package, (pkg) => pkg.items)
  @JoinColumn({ name: 'package_id' })
  package: Relation<Package>;

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
