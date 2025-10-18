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
import { ProductType } from './product-type.entity';
import { Product } from './product.entity';

@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'uuidv7()',
  })
  id: string;

  @Column({ name: 'product_type_id' })
  productTypeId: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => ProductType, (type) => type.categorys)
  @JoinColumn({ name: 'product_type_id' })
  productType: Relation<ProductType>;

  @OneToMany(() => Product, (product) => product.category)
  products: Relation<Product[]>;
}
