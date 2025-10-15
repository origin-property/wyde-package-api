import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { SysMasterUnits } from './SysMasterUnits.entity';
import { SysREMTower } from './SysREMTower.entity';

@Entity('Sys_REM_Floor')
export class SysREMFloor {
  @PrimaryColumn({ name: 'FloorID' })
  id: number;

  @Column({ name: 'TowerID', nullable: true })
  towerId: number;

  @Column({ name: 'ProjectID', length: 10, nullable: true })
  projectId: string;

  @Column({ name: 'FloorName', length: 50, nullable: true })
  nameTh: string;

  @Column({
    name: 'FloorNameEng',
    length: 50,
    nullable: true,
    default: "('')",
  })
  nameEn: string;

  @Column({
    name: 'FloorNameTransfer',
    nullable: true,
  })
  transfer: string;

  @Column({
    name: 'Description',
    length: 255,
    nullable: true,
  })
  description: string;

  @Column({
    name: 'FloorPlanPath',
    length: 500,
    nullable: true,
  })
  planPath: string;

  @Column({ name: 'isDelete', nullable: true })
  isDelete: boolean;

  @Column({ name: 'CreateDate', nullable: true })
  createDate: Date;

  @Column({ name: 'CreateBy', length: 50, nullable: true })
  createBy: string;

  @Column({ name: 'ModifyDate', nullable: true })
  modifyDate: Date;

  @Column({ name: 'ModifyBy', length: 50, nullable: true })
  modifyBy: string;

  @OneToMany(() => SysMasterUnits, unit => unit.floor)
  units: Relation<SysMasterUnits[]>;

  @ManyToOne(() => SysREMTower, tower => tower.floors, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'TowerID' })
  tower: Relation<SysREMTower[]>;
}
