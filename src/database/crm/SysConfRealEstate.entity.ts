import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { SysMasterProjects } from './SysMasterProjects.entity';

@Entity('Sys_Conf_RealEstate')
export class SysConfRealEstate {
  @PrimaryColumn({ name: 'ConfigID' })
  id: number;

  @Column({ name: 'CompanyID', nullable: true })
  companyId: string;

  @Column({ name: 'SBUID', nullable: true })
  sbuId: string;

  @Column({ name: 'ProjectID', nullable: true })
  projectId: string;

  @Column({ name: 'KEYNAME', nullable: true })
  keyName: string;

  @Column({ name: 'GroupName', nullable: true })
  groupName: string;

  @Column({ name: 'Caption', nullable: true })
  caption: string;

  @Column({ name: 'Value', nullable: true })
  value: string;

  @Column({ name: 'Value2', nullable: true })
  value2: string;

  @Column({ name: 'Unit', nullable: true })
  unit: string;

  @Column({ name: 'TermXY', nullable: true })
  termXY: string;

  @Column({ name: 'COrder', nullable: true })
  cOrder: number;

  @Column({ name: 'DataType', nullable: true })
  dataType: string;

  @Column({ name: 'Description', nullable: true })
  description: string;

  @Column({ name: 'LastUpdateBy', nullable: true })
  lastUpdateBy: string;

  @Column({ name: 'LastUpdateDate', nullable: true })
  lastUpdateDate: Date;

  @ManyToOne(() => SysMasterProjects, project => project.configs, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'ProjectID' })
  project: Relation<SysMasterProjects>;
}
