import { Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { SysMasterProjects } from './SysMasterProjects.entity';

@Entity('Sys_Admin_Companies')
export class SysAdminCompanies {
  @PrimaryColumn({ name: 'CompanyID', length: 15 })
  id: string;

  @Column({
    name: 'CompanyNameThai',
    length: 255,
    nullable: true,
  })
  nameTh: string;

  @Column({
    name: 'CompanyNameEng',
    length: 255,
    nullable: true,
  })
  nameEn: string;

  @Column({ name: 'ParentID', length: 15, nullable: true })
  parentId: string;

  @Column({ name: 'isJoinCompany', nullable: true })
  isJoinCompany: boolean;

  @Column({
    name: 'Description',
    length: 255,
    nullable: true,
  })
  description: string;

  @Column({ name: 'TaxID', length: 15, nullable: true })
  taxId: string;

  @Column({ name: 'AddressThai', length: 50, nullable: true })
  addressTh: string;

  @Column({ name: 'AddressEng', length: 50, nullable: true })
  addressEn: string;

  @Column({
    name: 'BuildingThai',
    length: 50,
    nullable: true,
  })
  buildingTh: string;

  @Column({ name: 'BuildingEng', length: 50, nullable: true })
  buildingEn: string;

  @Column({ name: 'MooThai', length: 50, nullable: true })
  mooTh: string;

  @Column({ name: 'MooEng', length: 50, nullable: true })
  mooEn: string;

  @Column({ name: 'SoiThai', length: 50, nullable: true })
  soiTh: string;

  @Column({ name: 'SoiEng', length: 50, nullable: true })
  soiEn: string;

  @Column({ name: 'RoadThai', length: 50, nullable: true })
  roadTh: string;

  @Column({ name: 'RoadEng', length: 50, nullable: true })
  roadEn: string;

  @Column({
    name: 'SubDistrictThai',
    length: 50,
    nullable: true,
  })
  subDistrictTh: string;

  @Column({
    name: 'SubDistrictEng',
    length: 50,
    nullable: true,
  })
  subDistrictEn: string;

  @Column({
    name: 'DistrictThai',
    length: 50,
    nullable: true,
  })
  districtTh: string;

  @Column({ name: 'DistrictEng', length: 50, nullable: true })
  districtEn: string;

  @Column({
    name: 'ProvinceThai',
    length: 50,
    nullable: true,
  })
  provinceTh: string;

  @Column({ name: 'ProvinceEng', length: 50, nullable: true })
  provinceEn: string;

  @Column({ name: 'PostCode', length: 10, nullable: true })
  postCode: string;

  @Column({ name: 'Telephone', length: 25, nullable: true })
  telephone: string;

  @Column({ name: 'Fax', length: 25, nullable: true })
  fax: string;

  @Column({ name: 'Website', length: 50, nullable: true })
  website: string;

  @Column({
    name: 'ImageLogoPath',
    length: 255,
    nullable: true,
  })
  imageLogoPath: string;

  @Column({
    name: 'ImageLogoStamp',
    length: 255,
    nullable: true,
  })
  imageLogoStamp: string;

  @Column({ name: 'Sync_Code', length: 20, nullable: true })
  syncCode: string;

  @Column({
    name: 'Alt_CompanyID',
    length: 5,
    nullable: true,
  })
  altCompanyID: string;

  @Column({ name: 'Sync_Date', nullable: true })
  syncDate: Date;

  @Column({ name: 'SAPWBSCode', length: 20, nullable: true })
  sapWBSCode: string;

  @Column({ name: 'ACCWBSCode', length: 20, nullable: true })
  accWBSCode: string;

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

  @Column({ name: 'Floor', length: 50, nullable: true })
  floor: string;

  @OneToMany(() => SysMasterProjects, project => project.company)
  projects: Relation<SysMasterProjects[]>;
}
