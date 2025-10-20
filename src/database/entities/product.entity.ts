import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { ProductItemType } from '../../shared/enums/product.enum';
import { BaseEntity } from './base';
import { Category } from './category.entity';
import { PackageDetail } from './package-detail.entity';
import { PackageItem } from './package-item.entity';
import { ProductOption } from './product-option.entity';
import { ProductType } from './product-type.entity';
import { ProductVariant } from './product-variant.entity';

@Entity({ name: 'product' })
export class Product extends BaseEntity {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'uuidv7()',
  })
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => ProductOption, (option) => option.product, { cascade: true })
  options: Relation<ProductOption[]>;

  @OneToMany(() => ProductVariant, (variant) => variant.product, {
    cascade: true,
  })
  variants: Relation<ProductVariant[]>;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @Column({ name: 'category_id', nullable: true })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Relation<Category>;

  @OneToMany(() => PackageItem, (item) => item.product, { cascade: true })
  packageItems: Relation<PackageItem[]>;

  @Column({
    name: 'item_type',
    type: 'enum',
    enum: ProductItemType,
    default: ProductItemType.PRODUCT,
  })
  itemType: ProductItemType;

  @OneToOne(() => PackageDetail, (detail) => detail.product, { cascade: true })
  packageDetail: Relation<PackageDetail>;
}
