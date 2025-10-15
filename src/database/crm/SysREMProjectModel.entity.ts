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
import { SysREMMasterModelType } from './SysREMMasterModelType.entity';

@Entity('Sys_REM_ProjectModel')
export class SysREMProjectModel {
  @PrimaryColumn({ name: 'ModelID', length: 20 })
  id: string;

  @PrimaryColumn({ name: 'ProjectID', length: 50 })
  projectId: string;

  @Column({
    name: 'ModelTypeID',
    length: 50,
    nullable: true,
  })
  modelTypeId: string;

  @Column({
    name: 'ModelName',
    length: 2000,
    nullable: true,
  })
  nameTh: string;

  @Column({
    name: 'ModelNameEng',
    length: 2000,
    nullable: true,
  })
  nameEn: string;

  @Column({
    type: 'numeric',
    name: 'ModelArea',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  area: number;

  @Column({
    name: 'ModelImagePath',
    length: 255,
    nullable: true,
  })
  imagePath: string;

  @Column({
    name: 'WaterMeterSize',
    length: 50,
    nullable: true,
  })
  waterMeterSize: string;

  @Column({
    name: 'ElectricMeterSize',
    length: 50,
    nullable: true,
  })
  electricMeterSize: string;

  @Column({
    type: 'numeric',
    name: 'WaterIns',
    nullable: true,
    precision: 18,
    scale: 2,
  })
  waterIns: number;

  @Column({
    type: 'numeric',
    name: 'ElectricIns',
    nullable: true,
    precision: 18,
    scale: 2,
  })
  electricIns: number;

  @Column({
    type: 'numeric',
    name: 'WaterInstall',
    nullable: true,
    precision: 18,
    scale: 2,
  })
  waterInstall: number;

  @Column({
    type: 'numeric',
    name: 'ElectricInstall',
    nullable: true,
    precision: 18,
    scale: 2,
  })
  electricInstall: number;

  @Column({
    name: 'isDelete',
    nullable: true,
  })
  isDelete: boolean;

  @Column({
    type: 'datetime',
    name: 'CreateDate',
    nullable: true,
  })
  createDate: Date;

  @Column({
    name: 'CreateBy',
    length: 50,
    nullable: true,
  })
  createBy: string;

  @Column({
    type: 'datetime',
    name: 'ModifyDate',
    nullable: true,
  })
  modifyDate: Date;

  @Column({
    name: 'ModifyBy',
    length: 50,
    nullable: true,
  })
  modifyBy: string;

  @Column({
    name: 'Location',
    length: 255,
    nullable: true,
  })
  location: string;

  @Column({
    name: 'ShortName',
    length: 50,
    nullable: true,
  })
  shortName: string;

  @OneToMany(() => SysMasterUnits, unit => unit.model)
  units: Relation<SysMasterUnits[]>;

  @ManyToOne(() => SysREMMasterModelType, modelType => modelType.models, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'ModelTypeID' })
  modelType: Relation<SysREMMasterModelType>;
}
