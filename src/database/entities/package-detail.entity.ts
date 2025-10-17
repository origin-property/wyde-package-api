import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base';
import { Product } from './product.entity';

@Entity({ name: 'package_detail' })
export class PackageDetail {
  @PrimaryColumn('uuid', { name: 'product_id' })
  productId: string;

  @Column('uuid')
  projectId: string;

  @Column('uuid')
  modelId: string;

  @OneToOne(() => Product, (product) => product.packageDetail, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
