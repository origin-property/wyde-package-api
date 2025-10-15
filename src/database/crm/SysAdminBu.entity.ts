import { Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { SysMasterProjects } from './SysMasterProjects.entity';

@Entity('Sys_Admin_Bu')
export class SysAdminBu {
  @PrimaryColumn({ name: 'BUId', length: 50 })
  id: string;

  @Column({ name: 'RoleId', length: 50, nullable: true })
  roleId: string;

  @Column({ name: 'BUCode', length: 50, nullable: true })
  code: string;

  @Column({ name: 'BUName', length: 255, nullable: true })
  name: string;

  @Column({ name: 'ParentId', length: 50, nullable: true })
  parentId: string;

  @Column({
    name: 'Description',
    length: 255,
    nullable: true,
  })
  description: string;

  @Column({ name: 'isActived', nullable: true })
  isActive: boolean;

  @Column({ name: 'isDelete', nullable: true })
  isDelete: boolean;

  @Column({ name: 'CreateBy', length: 50, nullable: true })
  createBy: string;

  @Column({ name: 'CreateDate', nullable: true })
  createDate: Date;

  @Column({ name: 'ModifyBy', length: 50, nullable: true })
  modifyBy: string;

  @Column({ name: 'ModifyDate', nullable: true })
  modifyDate: Date;

  @Column({ name: 'BuFor', length: 20, nullable: true })
  buFor: string;

  @OneToMany(() => SysMasterProjects, project => project.businessUnit)
  projects: Relation<SysMasterProjects[]>;
}
