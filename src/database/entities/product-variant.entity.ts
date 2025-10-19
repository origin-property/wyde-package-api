import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { BaseEntity } from './base';
import { PackageItem } from './package-item.entity';
import { ProductOptionValue } from './product-option-value.entity';
import { ProductVariantImage } from './product-variant-image.entity';
import { Product } from './product.entity';

@Entity({ name: 'product_variant' })
export class ProductVariant extends BaseEntity {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'uuidv7()',
  })
  id: string;

  @Column({ name: 'product_id' })
  productId: string;

  @Column({ length: 100, unique: true })
  sku: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  sellingPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  budgetPrice: number;

  @Column({ default: 0 })
  stock: number;

  @Column({
    default: true,
  })
  isActive: boolean;

  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn({ name: 'product_id' })
  product: Relation<Product>;

  @OneToMany(() => ProductVariantImage, (image) => image.variant, {
    cascade: true,
  })
  images: Relation<ProductVariantImage[]>;

  @ManyToMany(() => ProductOptionValue)
  @JoinTable({
    name: 'variant_option_values',
    joinColumn: { name: 'product_variant_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'product_option_value_id',
      referencedColumnName: 'id',
    },
  })
  optionValues: Relation<ProductOptionValue[]>;

  @OneToMany(() => PackageItem, (item) => item.productVariant)
  packages: Relation<PackageItem[]>;
}
