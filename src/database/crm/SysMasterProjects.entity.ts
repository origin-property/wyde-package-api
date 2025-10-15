import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { SysAdminBu } from './SysAdminBu.entity';
import { SysAdminCompanies } from './SysAdminCompanies.entity';
import { SysConfRealEstate } from './SysConfRealEstate.entity';
import { SysMasterBrands } from './SysMasterBrands.entity';
import { SysMasterProjectAddresses } from './SysMasterProjectAddresses.entity';
import { SysMasterUnits } from './SysMasterUnits.entity';
import { SysREMBasePrice } from './SysREMBasePrice.entity';
import { SysREMFileData } from './SysREMFileData.entit';
import { SysREMPricelist } from './SysREMPricelist.entity';

@Entity('Sys_Master_Projects')
export class SysMasterProjects {
  @PrimaryColumn({ length: 15, name: 'ProjectID' })
  id: string;

  @Column({ name: 'ProjectName', nullable: true })
  nameTh: string;

  @Column({ name: 'ProjectNameEng', nullable: true })
  nameEn: string;

  @Column({ name: 'ProjectNameTitleDeed', nullable: true })
  nameTitleDeed: string;

  @Column({ length: 1, name: 'ProjectType', nullable: true })
  type: string;

  @Column({ name: 'RealEstateType', nullable: true })
  realEstateType: number;

  @Column({ length: 50, name: 'BUID', nullable: true })
  businessUnitId: string;

  @Column({ name: 'SubBUID', nullable: true })
  subBuId: number;

  @Column({ length: 15, name: 'BrandID', nullable: true })
  brandId: string;

  @Column({ length: 15, name: 'CompanyID', nullable: true })
  companyId: string;

  @Column({ name: 'TotalUnit', nullable: true })
  totalUnit: number;

  @Column({ name: 'TotalTitleDeed', nullable: true })
  totalTitleDeed: number;

  @Column({
    length: 15,
    name: 'ProjectStatus',
    nullable: true,
  })
  status: string;

  @Column({ name: 'ProjectOpen', nullable: true })
  openDate: Date;

  @Column({ name: 'ProjectClose', nullable: true })
  closeDate: Date;

  @Column({
    length: 50,
    name: 'ProjectOwner',
    nullable: true,
  })
  owner: string;

  @Column({ length: 20, name: 'ProjectTel', nullable: true })
  telephone: string;

  @Column({ length: 20, name: 'ProjectFax', nullable: true })
  fax: string;

  @Column({
    length: 100,
    name: 'ProjectEmail',
    nullable: true,
  })
  email: string;

  @Column({
    length: 100,
    name: 'ProjectWebsite',
    nullable: true,
  })
  website: string;

  @Column({
    type: 'datetime',
    name: 'BuildCompleteDate',
    nullable: true,
  })
  buildCompleteDate: Date;

  @Column({
    type: 'numeric',
    name: 'ProjectValues',
    nullable: true,
    precision: 18,
    scale: 2,
  })
  values: number;

  @Column({ name: 'AreaRai', nullable: true })
  areaRai: number;

  @Column({ name: 'Areangan', nullable: true })
  areaNgan: number;

  @Column({
    type: 'numeric',
    name: 'AreaSquareWah',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  areaSquareWah: number;

  @Column({ name: 'Remark', nullable: true })
  remark: string;

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
    name: 'JuristicNameEng',
    nullable: true,
  })
  juristicNameEng: string;

  @Column({ name: 'JuristicDate', nullable: true })
  juristicDate: Date;

  @Column({ length: 50, name: 'ImgPath', nullable: true })
  imgPath: string;

  @Column({ type: 'float', name: 'BudgetAlertPerc', nullable: true })
  budgetAlertPerc: number;

  @Column({
    type: 'decimal',
    name: 'BudgetAlertAmt',
    nullable: true,
    precision: 18,
    scale: 2,
  })
  budgetAlertAmt: number;

  @Column({ name: 'isRenovate', nullable: true })
  isRenovate: boolean;

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

  @Column({ length: 50, name: 'BOQID', nullable: true })
  boqId: string;

  @Column({
    length: 255,
    name: 'MoFinanceNameTH',
    nullable: true,
  })
  moFinanceNameTh: string;

  @Column({
    length: 255,
    name: 'MoFinanceNameEN',
    nullable: true,
  })
  moFinanceNameEn: string;

  @Column({ length: 255, name: 'Port', nullable: true })
  port: string;

  @Column({
    length: 255,
    name: 'AbProjectName',
    nullable: true,
  })
  abProjectName: string;

  @Column({
    length: 510,
    name: 'ProjectImagePath',
    nullable: true,
  })
  projectImagePath: string;

  @Column({
    length: 20,
    name: 'SAPWBSCode',
    nullable: true,
  })
  sapWbsCode: string;

  @Column({
    length: 20,
    name: 'ACCWBSCode',
    nullable: true,
  })
  accWbsCode: string;

  @Column({
    length: 20,
    name: 'COMWBSCode',
    nullable: true,
  })
  comWbsCode: string;

  @Column({
    length: 20,
    name: 'PlantCode',
    nullable: true,
  })
  plantCode: string;

  @Column({
    length: 50,
    name: 'SAPProfitCenter',
    nullable: true,
  })
  sapProfitCenter: string;

  @Column({
    length: 50,
    name: 'SAPProfixCenter',
    nullable: true,
  })
  sapProfixCenter: string;

  @Column({
    length: 50,
    name: 'SAPPostCenter',
    nullable: true,
  })
  sapPostCenter: string;

  @Column({
    length: 50,
    name: 'SAPCostCenter',
    nullable: true,
  })
  sapCostCenter: string;

  @Column({ name: 'AllowSendSAP', nullable: true })
  allowSendSAP: boolean;

  @Column({
    length: 50,
    name: 'SAPCostCenter2',
    nullable: true,
  })
  sapCostCenter2: string;

  @Column({
    length: 50,
    name: 'SAPBandCode',
    nullable: true,
  })
  sapBandCode: string;

  @Column({
    length: 50,
    name: 'SAPPlantCode',
    nullable: true,
  })
  sapPlantCode: string;

  @Column({
    length: 50,
    name: 'SAPPlantCode2',
    nullable: true,
  })
  sapPlantCode2: string;

  @Column({
    length: 50,
    name: 'SAPWBSCode47',
    nullable: true,
  })
  sapWbsCode47: string;

  @Column({
    length: 50,
    name: 'SAPCostCenter47',
    nullable: true,
  })
  sapCostCenter47: string;

  @Column({
    length: 50,
    name: 'SAPCostCenter472',
    nullable: true,
  })
  sapCostCenter472: string;

  @Column({
    length: 'MAX',
    name: 'AccountStaffName',
    nullable: true,
  })
  accountStaffName: string;

  @Column({
    type: 'numeric',
    precision: 18,
    scale: 2,
    name: 'ProjectValues2',
    nullable: true,
  })
  projectValues2: number;

  @Column({
    length: 20,
    name: 'ContractType',
    nullable: true,
  })
  contractType: string;

  @Column({
    length: 4,
    name: 'AccountProject',
    nullable: true,
  })
  accountProject: string;

  @Column({ type: 'text', name: 'Base64Image', nullable: true })
  base64Image: string;

  @Column({ name: 'isJV', nullable: true })
  isJv: boolean;

  @Column({
    length: 50,
    name: 'CompanyJV',
    nullable: true,
  })
  companyJv: string;

  @Column({ name: 'isPreTransfer', nullable: true })
  isPreTransfer: boolean;

  @OneToMany(() => SysMasterUnits, (unit) => unit.project)
  units: Relation<SysMasterUnits[]>;

  @OneToMany(() => SysREMBasePrice, (basePrice) => basePrice.project)
  basePrices: Relation<SysREMBasePrice[]>;

  @OneToMany(() => SysREMFileData, (file) => file.project)
  files: Relation<SysREMFileData[]>;

  @OneToMany(() => SysREMPricelist, (priceList) => priceList.project)
  priceLists: Relation<SysREMPricelist[]>;

  @OneToOne(() => SysMasterProjectAddresses, (address) => address.project)
  address: Relation<SysMasterProjectAddresses>;

  @ManyToOne(() => SysAdminCompanies, (company) => company.projects, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'CompanyID' })
  company: Relation<SysAdminCompanies>;

  @ManyToOne(() => SysAdminBu, (businessUnit) => businessUnit.projects, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'BUID' })
  businessUnit: Relation<SysAdminBu>;

  @ManyToOne(() => SysMasterBrands, (brand) => brand.projects, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'BrandID' })
  brand: Relation<SysMasterBrands>;

  @OneToMany(() => SysConfRealEstate, (config) => config.project)
  configs: Relation<SysConfRealEstate[]>;
}
