import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base';
import { Product } from './product.entity';
import { ProductOptionValue } from './product-option-value.entity';

@Entity({ name: 'product_options' })
export class ProductOption extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_id' })
  productId: number;

  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => Product, (product) => product.options)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(() => ProductOptionValue, (value) => value.productOption)
  optionValues: ProductOptionValue[];
}
