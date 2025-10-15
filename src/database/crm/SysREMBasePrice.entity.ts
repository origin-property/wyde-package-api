import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { SysMasterProjects } from './SysMasterProjects.entity';

@Entity('Sys_REM_BasePrice')
export class SysREMBasePrice {
  @PrimaryColumn({ name: 'BasePriceID' })
  id: number;

  @Column({ name: 'ProjectID', length: 10, nullable: true })
  projectId: string;

  @Column({ name: 'Unitnumber', length: 20, nullable: true })
  unitNumber: string;

  @Column({ name: 'UpdateDate', nullable: true })
  updateDate: Date;

  @Column({
    type: 'numeric',
    name: 'BasePrice',
    nullable: true,
    precision: 18,
    scale: 4,
  })
  basePrice: number;

  @Column({ name: 'BPType', length: 20, nullable: true })
  bpType: string;

  @Column({
    type: 'numeric',
    name: 'BasePriceByPFB',
    nullable: true,
    precision: 18,
    scale: 2,
  })
  basePriceByPFB: number;

  @Column({ name: 'UpdateDatePFB', nullable: true })
  updateDatePFB: Date;

  @Column({ name: 'UpdateByPFB', length: 50, nullable: true })
  updateByPFB: string;

  @Column({
    type: 'numeric',
    name: 'BasePriceBySBU',
    nullable: true,
    precision: 18,
    scale: 2,
  })
  basePriceBySBU: number;

  @Column({ name: 'UpdateDateSBU', nullable: true })
  updateDateSBU: Date;

  @Column({ name: 'UpdateBySBU', length: 50, nullable: true })
  updateBySBU: string;

  @ManyToOne(() => SysMasterProjects, project => project.basePrices, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'ProjectID' })
  project: Relation<SysMasterProjects>;
}
