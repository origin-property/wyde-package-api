import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { SysMasterProjects } from './SysMasterProjects.entity';
import { SysREMFloor } from './SysREMFloor.entity';
import { SysREMProjectModel } from './SysREMProjectModel.entity';
import { SysREMTower } from './SysREMTower.entity';

@Entity('Sys_Master_Units', {
  comment: 'ข้อมูลยูนิต',
})
export class SysMasterUnits {
  @PrimaryColumn({ name: 'UnitID', length: 50 })
  id: string;

  @Column({
    name: 'SBUID',
    length: 10,
    nullable: true,
  })
  sbuId: string;

  @Column({
    name: 'UnitNumber',
    length: 20,
    nullable: true,
  })
  unitNumber: string;

  @Column({
    name: 'UnitNumber2',
    length: 20,
    nullable: true,
  })
  unitNumber2: string;

  @Column({
    name: 'ProjectID',
    length: 10,
    nullable: true,
  })
  projectId: string;

  @Column({
    name: 'ModelID',
    length: 20,
    nullable: true,
  })
  modelId: string;

  @Column({
    name: 'PhaseID',
    nullable: true,
  })
  phaseId: number;

  @Column({
    name: 'SubPhaseID',
    nullable: true,
  })
  subPhaseId: string;

  @Column({
    name: 'Block',
    length: 50,
    nullable: true,
  })
  block: string;

  @Column({
    name: 'TowerID',
    nullable: true,
  })
  towerId: number;

  @Column({
    name: 'FloorID',
    nullable: true,
  })
  floorId: number;

  @Column({
    type: 'numeric',
    name: 'SellingArea',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  sellingArea: number;

  @Column({
    type: 'numeric',
    name: 'HouseArea',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  houseArea: number;

  @Column({
    type: 'numeric',
    name: 'TitledeedArea',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  titledeedArea: number;

  @Column({
    type: 'numeric',
    name: 'BuildingArea',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  buildingArea: number;

  @Column({
    name: 'HouseNumber',
    length: 50,
    nullable: true,
  })
  houseNumber: string;

  @Column({
    name: 'HouseYear',
    nullable: true,
  })
  houseYear: number;

  @Column({
    name: 'QCVendorDate',
    nullable: true,
  })
  qcVendorDate: Date;

  @Column({
    name: 'QCCustomerDate',
    nullable: true,
  })
  qcCustomerDate: Date;

  @Column({
    name: 'AssetType',
    nullable: true,
  })
  assetType: number;

  @Column({
    name: 'UnitStatus',
    length: 10,
    nullable: true,
  })
  unitStatus: string;

  @Column({
    name: 'Location',
    length: 255,
    nullable: true,
  })
  location: string;

  @Column({
    name: 'isDelete',
    nullable: true,
  })
  isDelete: boolean;

  @Column({
    name: 'Remark',
    nullable: true,
  })
  remark: string;

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
    name: 'BillPaymentCode',
    length: 50,
    nullable: true,
  })
  billPaymentCode: string;

  @Column({
    name: 'SAPWBSCode',
    length: 50,
    nullable: true,
  })
  sapWbsCode: string;

  @Column({
    name: 'SAPStatusFlag',
    length: 1,
    nullable: true,
  })
  sapStatusFlag: string;

  @Column({
    name: 'SAPRemarks',
    nullable: true,
  })
  sapRemarks: string;

  @Column({
    name: 'SAPCurrStatus',
    length: 4,
    nullable: true,
  })
  sapCurrStatus: string;

  @Column({
    name: 'SAPOldStatus',
    length: 4,
    nullable: true,
  })
  sapOldStatus: string;

  @Column({
    name: 'Zone',
    length: 50,
    nullable: true,
  })
  zone: string;

  @Column({
    name: 'AddressNo',
    length: 50,
    nullable: true,
  })
  addressNo: string;

  @Column({
    name: 'Moo',
    length: 50,
    nullable: true,
  })
  moo: string;

  @Column({
    name: 'Soi',
    length: 50,
    nullable: true,
  })
  soi: string;

  @Column({
    name: 'Village',
    length: 50,
    nullable: true,
  })
  village: string;

  @Column({
    name: 'Road',
    length: 50,
    nullable: true,
  })
  road: string;

  @Column({
    name: 'SubDistrict',
    length: 50,
    nullable: true,
  })
  subDistrict: string;

  @Column({
    name: 'District',
    length: 50,
    nullable: true,
  })
  district: string;

  @Column({
    name: 'Province',
    length: 50,
    nullable: true,
  })
  province: string;

  @Column({
    name: 'ZipCode',
    length: 50,
    nullable: true,
  })
  zipCode: string;

  @Column({
    name: 'Country',
    length: 50,
    nullable: true,
  })
  country: string;

  @Column({
    name: 'WorkPackage',
    length: 50,
    nullable: true,
  })
  workPackage: string;

  @Column({
    name: 'WorkPackageDate',
    nullable: true,
  })
  workPackageDate: Date;

  @Column({
    name: 'BOIID',
    nullable: true,
  })
  boiId: number;

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
    name: 'WaterInstall',
    nullable: true,
    precision: 18,
    scale: 2,
  })
  waterInstall: number;

  @Column({
    name: 'WaterMeterSize',
    length: 50,
    nullable: true,
  })
  waterMeterSize: string;

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
    name: 'ElectricInstall',
    nullable: true,
    precision: 18,
    scale: 2,
  })
  electricInstall: number;

  @Column({
    name: 'ElectricMeterSize',
    length: 50,
    nullable: true,
  })
  electricMeterSize: string;

  @Column({
    name: 'PJLandOfficeID',
    nullable: true,
  })
  pjLandOfficeId: number;

  @Column({
    name: 'WCustomerRequestDate',
    nullable: true,
  })
  wCustomerRequestDate: Date;

  @Column({
    name: 'WEstimatedDateComplete',
    nullable: true,
  })
  wEstimatedDateComplete: Date;

  @Column({
    name: 'ECustomerRequestDate',
    nullable: true,
  })
  eCustomerRequestDate: Date;

  @Column({
    name: 'EEstimatedDateComplete',
    nullable: true,
  })
  eEstimatedDateComplete: Date;

  @Column({
    type: 'numeric',
    name: 'ActualEstimatePrice',
    nullable: true,
    precision: 18,
    scale: 2,
  })
  actualEstimatePrice: number;

  @Column({
    name: 'UnitCombineFlag',
    length: 20,
    nullable: true,
    default: "(N'N')",
  })
  unitCombineFlag: string;

  @Column({
    type: 'numeric',
    name: 'PublicFee',
    nullable: true,
    precision: 18,
    scale: 2,
  })
  publicFee: number;

  @Column({
    name: 'PublicFeeType',
    length: 10,
    nullable: true,
  })
  publicFeeType: string;

  @Column({
    name: 'Transferduedate',
    nullable: true,
  })
  transferduedate: Date;

  @Column({
    name: 'LockLevel',
    nullable: true,
  })
  lockLevel: number;

  @Column({
    name: 'AccountRoom',
    length: 4,
    nullable: true,
  })
  accountRoom: string;

  @Column({
    name: 'BU',
    length: 20,
    nullable: true,
  })
  bu: string;

  @Column({
    type: 'numeric',
    name: 'ChangeOwnerAmt',
    nullable: true,
    precision: 18,
    scale: 2,
  })
  changeOwnerAmt: number;

  @Column({
    type: 'date',
    name: 'ChangeOwnerDate',
    nullable: true,
  })
  changeOwnerDate: Date;

  @Column({
    name: 'showPromtSale',
    nullable: true,
  })
  showPromtSale: boolean;

  @ManyToOne(() => SysMasterProjects, (project) => project.units, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'ProjectID' })
  project: Relation<SysMasterProjects>;

  @ManyToOne(() => SysREMTower, (tower) => tower.units, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'TowerID' })
  tower: Relation<SysREMTower>;

  @ManyToOne(() => SysREMFloor, (floor) => floor.units, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'FloorID' })
  floor: Relation<SysREMFloor>;

  @ManyToOne(() => SysREMProjectModel, (model) => model.units, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn([{ name: 'ModelID' }, { name: 'ProjectID' }])
  model: Relation<SysREMProjectModel>;
}
