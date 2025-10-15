import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base';
import { ProductOption } from './product-option.entity';

@Entity({ name: 'product_option_values' })
export class ProductOptionValue extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_option_id' })
  productOptionId: number;

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
  productOption: ProductOption;
}
