import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Relation,
} from 'typeorm';
import { BaseEntity } from './base';
import { PackageItem } from './package-item.entity';

@Entity({ name: 'package' })
export class Package extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  projectId: string;

  @Column()
  unitId: string;

  @OneToMany(() => PackageItem, (item) => item.package)
  items: Relation<PackageItem[]>;
}
