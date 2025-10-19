import { Column, Entity, OneToOne, PrimaryColumn, Relation } from 'typeorm';
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
  product: Relation<Product>;
}
