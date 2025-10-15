import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { SysMasterProjects } from './SysMasterProjects.entity';

@Entity('Sys_Master_ProjectAddresses')
export class SysMasterProjectAddresses {
  @PrimaryColumn({ name: 'ProjectAddressID' })
  id: number;

  @Column({ length: 15, name: 'ProjectID' })
  projectId: string;

  @Column({ length: 255, name: 'AddressNo' })
  addressNo: string;

  @Column({ length: 255, name: 'AddressNoEng' })
  addressNoEn: string;

  @Column({ name: 'Moo' })
  moo: number;

  @Column({ name: 'MooEng' })
  mooEn: number;

  @Column({ length: 255, name: 'Soi' })
  soi: string;

  @Column({ length: 255, name: 'SoiEng' })
  soiEn: string;

  @Column({ length: 255, name: 'Road' })
  road: string;

  @Column({ length: 255, name: 'RoadEng' })
  roadEn: string;

  @Column({ length: 500, name: 'SubDistrict' })
  subDistrict: string;

  @Column({ length: 500, name: 'SubDistrictEng' })
  subDistrictEn: string;

  @Column({ length: 500, name: 'District' })
  district: string;

  @Column({ length: 500, name: 'DistrictEng' })
  districtEn: string;

  @Column({ length: 255, name: 'Province' })
  province: string;

  @Column({ length: 255, name: 'ProvinceEng' })
  provinceEn: string;

  @Column({ length: 255, name: 'PostCode' })
  postCode: string;

  @Column({ name: 'OrderBy' })
  orderBy: number;

  @Column({ name: 'TitledeedNumber' })
  titledeedNumber: string;

  @Column({ name: 'LandNumber' })
  landNumber: string;

  @Column({ name: 'LandSurveyArea' })
  landSurveyArea: string;

  @Column({ name: 'LandPortionNumber' })
  landPortionNumber: string;

  @Column({ name: 'LandBook' })
  landBook: string;

  @Column({ name: 'LandBookPage' })
  landBookPage: string;

  @Column({ name: 'FullAddress' })
  fullAddress: string;

  @Column({ name: 'LandOfficeID' })
  landOfficeId: number;

  @Column({ length: 1, name: 'Istitledeedaddress' })
  istitledeedaddress: string;

  @OneToOne(() => SysMasterProjects, project => project.address, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'ProjectID' })
  project: Relation<SysMasterProjects>;
}
