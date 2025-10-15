import { Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { SysMasterProjects } from './SysMasterProjects.entity';

@Entity('Sys_Master_Brands')
export class SysMasterBrands {
  @PrimaryColumn({ name: 'BrandID', length: 50 })
  id: string;

  @Column({ name: 'BrandName', length: 255, nullable: true })
  nameTh: string;

  @Column({
    name: 'BrandNameEng',
    length: 255,
    nullable: true,
  })
  nameEn: string;

  @Column({
    name: 'BrandNameAbs',
    length: 255,
    nullable: true,
  })
  nameThAbs: string;

  @Column({
    name: 'BrandNameEngAbs',
    length: 255,
    nullable: true,
  })
  nameEngAbs: string;

  @Column({
    name: 'BrandImagePath',
    length: 255,
    nullable: true,
  })
  imagePath: string;

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

  @Column({ name: 'ShortName', length: 50, nullable: true })
  shortName: string;

  @Column({ name: 'BrandCode', nullable: true })
  code: string;

  @OneToMany(() => SysMasterProjects, project => project.brand)
  projects: Relation<SysMasterProjects[]>;
}
