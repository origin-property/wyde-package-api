import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Relation,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base';
import { ProductOption } from './product-option.entity';
import { ProductVariant } from './product-variant.entity';
import { ProductType } from './product-type.entity';
import { Category } from './category.entity';

@Entity({ name: 'product' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => ProductOption, (option) => option.product)
  options: Relation<ProductOption[]>;

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants: Relation<ProductVariant[]>;

  @Column({ name: 'product_type_id' })
  productTypeId: string;

  @ManyToOne(() => ProductType, (type) => type.products)
  @JoinColumn({ name: 'product_type_id' })
  productType: ProductType;

  @Column({ name: 'category_id' })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Relation<Category>;
}
