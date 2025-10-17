import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => ProductOption, (option) => option.product)
  options: Relation<ProductOption[]>;

  @OneToMany(() => ProductVariant, (variant) => variant.product, {
    cascade: true,
  })
  variants: Relation<ProductVariant[]>;

  @Column({ name: 'product_type_id', nullable: true })
  productTypeId: string;

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
