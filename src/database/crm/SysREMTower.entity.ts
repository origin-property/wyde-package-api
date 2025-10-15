import { Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { SysMasterUnits } from './SysMasterUnits.entity';
import { SysREMFloor } from './SysREMFloor.entity';

@Entity('Sys_REM_Tower')
export class SysREMTower {
  @PrimaryColumn({ name: 'TowerID' })
  id: number;

  @Column({ length: 10, name: 'ProjectID', nullable: true })
  projectId: string;

  @Column({ length: 50, name: 'TowerName', nullable: true })
  nameTh: string;

  @Column({
    length: 50,
    name: 'TowerNameEng',
    nullable: true,
  })
  nameEn: string;

  @Column({ name: 'TowerNameTransfer', nullable: true })
  nameTransfer: string;

  @Column({
    length: 200,
    name: 'TitledeedNumber',
    nullable: true,
  })
  titledeedNumber: string;

  @Column({ length: 200, name: 'LandNumber', nullable: true })
  landNumber: string;

  @Column({
    length: 200,
    name: 'LandSurveyArea',
    nullable: true,
  })
  landSurveyArea: string;

  @Column({
    length: 200,
    name: 'LandPortionNumber',
    nullable: true,
  })
  landPortionNumber: string;

  @Column({
    type: 'numeric',
    name: 'TitleDeedArea',
    nullable: true,
  })
  titleDeedArea: number;

  @Column({ name: 'LandBook', nullable: true })
  landBook: number;

  @Column({
    length: 50,
    name: 'LandBookPage',
    nullable: true,
  })
  landBookPage: string;

  @Column({ length: 50, name: 'TowerNumber', nullable: true })
  towerNumber: string;

  @Column({
    length: 50,
    name: 'TowerLicenseNo',
    nullable: true,
  })
  towerLicenseNo: string;

  @Column({ name: 'StartDate', nullable: true })
  startDate: Date;

  @Column({ name: 'FinishDate', nullable: true })
  finishDate: Date;

  @Column({
    length: 255,
    name: 'Description',
    nullable: true,
  })
  description: string;

  @Column({ name: 'isDelete', nullable: true })
  isDelete: boolean;

  @Column({ name: 'CreateDate', nullable: true })
  createDate: Date;

  @Column({ length: 50, name: 'CreateBy', nullable: true })
  createBy: string;

  @Column({ name: 'ModifyDate', nullable: true })
  modifyDate: Date;

  @Column({ length: 50, name: 'ModifyBy', nullable: true })
  modifyBy: string;

  @Column({ name: 'JuristicID', nullable: true })
  juristicId: number;

  @Column({
    length: 50,
    name: 'JuristicName',
    nullable: true,
  })
  juristicName: string;

  @Column({
    length: 50,
    name: 'TowerTotalArea',
    nullable: true,
  })
  towerTotalArea: string;

  @Column({ length: 1, name: 'AccountTower', nullable: true })
  accountTower: string;

  @OneToMany(() => SysMasterUnits, unit => unit.tower)
  units: Relation<SysMasterUnits[]>;

  @OneToMany(() => SysREMFloor, floor => floor.tower)
  floors: Relation<SysREMFloor[]>;
}
