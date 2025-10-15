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

  @Column({ name: 'name', length: 255 })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'project_id' })
  projectId: string;

  @Column({ name: 'unit_id' })
  unitId: string;

  @Column({ name: 'is_ctive', default: true })
  isActive: boolean;

  @OneToMany(() => PackageItem, (item) => item.package)
  items: Relation<PackageItem[]>;
}
