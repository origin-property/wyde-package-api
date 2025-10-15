import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { SysMasterProjects } from './SysMasterProjects.entity';
import { SysREMPricelistDetails } from './SysREMPricelistDetails.entity';

@Entity('Sys_REM_Pricelist')
export class SysREMPricelist {
  @PrimaryColumn({ name: 'PriceListID' })
  id: number;

  @Column({ name: 'CompanyID', length: 15, nullable: true })
  companyId: string;

  @Column({ name: 'SBUID', length: 10, nullable: true })
  sbuId: string;

  @Column({ name: 'ProjectID', length: 50, nullable: true })
  projectId: string;

  @Column({
    type: 'nvarchar',
    name: 'PriceListName',
    length: 255,
    nullable: true,
  })
  name: string;

  @Column({ name: 'StartDate', nullable: true })
  startDate: Date;

  @Column({ name: 'ExpireDate', nullable: true })
  expiredDate: Date;

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

  @Column({ name: 'StartDateWeb', nullable: true })
  startDateWeb: Date;

  @Column({ name: 'EndDateWeb', nullable: true })
  endDateWeb: Date;

  @OneToMany(() => SysREMPricelistDetails, details => details.priceList)
  details: Relation<SysREMPricelistDetails[]>;

  @ManyToOne(() => SysMasterProjects, project => project.priceLists, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'ProjectID' })
  project: Relation<SysMasterProjects[]>;
}
