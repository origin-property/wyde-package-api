import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';
import { BaseEntity } from './base';
import { ProductVariant } from './product-variant.entity';

@Entity({ name: 'product_variant_image' })
export class ProductVariantImage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_variant_id' })
  productVariantId: string;

  @Column({ name: 'file_cur_name', length: 255, nullable: true })
  fileCurName: string;

  @Column({ name: 'file_prev_name', length: 255, nullable: true })
  filePrevName: string;

  @Column({ name: 'file_extension', length: 10, nullable: true })
  fileExtension: string;

  @Column({ name: 'alt_text', length: 255, nullable: true })
  altText: string;

  @Column({ name: 'is_main', default: false })
  isMain: boolean;

  @Column({ name: 'sort_order', default: 0 })
  sortOrder: number;

  @ManyToOne(() => ProductVariant, (variant) => variant.images)
  @JoinColumn({ name: 'product_variant_id' })
  variant: Relation<ProductVariant>;

  @Column({ name: 'file_path' })
  filePath: string;

  @Column({ name: 'file_bucket' })
  fileBucket: string;
}
