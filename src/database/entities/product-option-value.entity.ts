import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';
import { BaseEntity } from './base';
import { ProductOption } from './product-option.entity';

@Entity({ name: 'product_option_value' })
export class ProductOptionValue extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_option_id' })
  productOptionId: string;

  @Column({ length: 100 })
  value: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  price: number;

  @Column({ length: 255, nullable: true })
  image: string;

  // --- Relationships ---
  @ManyToOne(() => ProductOption, (option) => option.optionValues)
  @JoinColumn({ name: 'product_option_id' })
  productOption: Relation<ProductOption>;
}
