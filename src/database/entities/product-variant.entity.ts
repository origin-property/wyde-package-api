import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from './base';
import { Product } from './product.entity';
import { ProductOptionValue } from './product-option-value.entity';
import { ProductVariantImage } from './product-variant-image.entity';

@Entity({ name: 'product_variants' })
export class ProductVariant extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_id' })
  productId: number;

  @Column({ length: 100, unique: true })
  sku: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  stock: number;

  // --- Relationships ---
  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(() => ProductVariantImage, (image) => image.variant, {
    cascade: true,
  })
  images: ProductVariantImage[];

  @ManyToMany(() => ProductOptionValue)
  @JoinTable({
    name: 'variant_option_values',
    joinColumn: { name: 'product_variant_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'product_option_value_id',
      referencedColumnName: 'id',
    },
  })
  optionValues: ProductOptionValue[];
}
