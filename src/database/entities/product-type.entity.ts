import { Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { BaseEntity } from './base';
import { Category } from './category.entity';
import { Product } from './product.entity';

@Entity({ name: 'product_type' })
export class ProductType extends BaseEntity {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'uuidv7()',
  })
  id: string;

  @Column({ length: 10, unique: true, default: 'FUR' })
  code: string;

  @Column({ length: 255, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Product, (product) => product.productType)
  products: Relation<Product[]>;

  @OneToMany(() => Category, (category) => category.productType)
  categorys: Relation<Category[]>;
}
