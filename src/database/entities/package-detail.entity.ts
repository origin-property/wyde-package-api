import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  Relation,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'package_detail' })
export class PackageDetail {
  @PrimaryColumn('uuid', { name: 'product_id' })
  productId: string;

  @Column()
  projectId: string;

  @Column()
  modelId: string;

  @OneToOne(() => Product, (product) => product.packageDetail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Relation<Product>;
}
