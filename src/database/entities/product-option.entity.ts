import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { BaseEntity } from './base';
import { ProductOptionValue } from './product-option-value.entity';
import { Product } from './product.entity';

@Entity({ name: 'product_option' })
export class ProductOption extends BaseEntity {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'uuidv7()',
  })
  id: string;

  @Column({ name: 'product_id' })
  productId: string;

  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => Product, (product) => product.options)
  @JoinColumn({ name: 'product_id' })
  product: Relation<Product>;

  @OneToMany(() => ProductOptionValue, (value) => value.productOption)
  optionValues: Relation<ProductOptionValue[]>;
}
