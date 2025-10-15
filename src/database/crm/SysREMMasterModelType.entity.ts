import { Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { SysREMProjectModel } from './SysREMProjectModel.entity';

@Entity('Sys_REM_Master_ModelType')
export class SysREMMasterModelType {
  @PrimaryColumn({
    name: 'ModelTypeID',
    length: 50,
  })
  id: string;

  @Column({
    name: 'ModelTypeName',
    length: 500,
    nullable: true,
  })
  nameTh: string;

  @Column({
    name: 'ModelTypeNameEng',
    length: 500,
    nullable: true,
  })
  nameEn: string;

  @Column({
    name: 'ShortName',
    length: 500,
    nullable: true,
  })
  code: string;

  @Column({
    type: 'numeric',
    name: 'ModelArea',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  area: number;

  @Column({
    name: 'ProjectType',
    length: 1,
    nullable: true,
  })
  projectType: string;

  @Column({
    type: 'numeric',
    name: 'WaterMeterSize',
    nullable: true,
    precision: 18,
    scale: 2,
  })
  waterMeterSize: number;

  @Column({
    type: 'float',
    name: 'ElectricMeterSize',
    nullable: true,
  })
  electricMeterSize: number;

  @Column({
    name: 'isDelete',
    nullable: true,
  })
  isDelete: boolean;

  @Column({
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
    name: 'RealEstateID',
    nullable: true,
  })
  realEstateId: number;

  @OneToMany(() => SysREMProjectModel, model => model.modelType)
  models: Relation<SysREMProjectModel[]>;
}
