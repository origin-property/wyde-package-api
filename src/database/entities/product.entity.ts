import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Relation,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from './base';
import { ProductOption } from './product-option.entity';
import { ProductVariant } from './product-variant.entity';
import { ProductType } from './product-type.entity';
import { Category } from './category.entity';
import { PackageItem } from './package-item.entity';
import { PackageDetail } from './package-detail.entity';

export enum ProductItemType {
  PRODUCT = 'PRODUCT',
  PACKAGE = 'PACKAGE',
}

@Entity({ name: 'product' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
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

  @Column({ name: 'product_type_id', nullable: true })
  productTypeId: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @ManyToOne(() => ProductType, (type) => type.products)
  @JoinColumn({ name: 'product_type_id' })
  productType: Relation<ProductType>;

  @Column({ name: 'category_id', nullable: true })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Relation<Category>;

  @OneToMany(() => PackageItem, (item) => item.product)
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
