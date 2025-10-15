import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Sys_Master_SBU')
export class SysMasterSBU {
  @PrimaryColumn({ length: 10, name: 'SBUID' })
  id: string;

  @Column({ length: 50, name: 'SBUName', nullable: true })
  name: string;

  @Column({
    length: 255,
    name: 'Description',
    nullable: true,
  })
  description: string;

  @Column({ name: 'isSystem', nullable: true })
  isSystem: boolean;

  @Column({ name: 'isDefault', nullable: true })
  isDefault: boolean;

  @Column({ name: 'isDelete', nullable: true })
  isDelete: boolean;

  @Column({ name: 'CreateDate', nullable: true })
  createdAt: Date;

  @Column({ length: 50, name: 'CreateBy', nullable: true })
  createdBy: string;

  @Column({ name: 'ModifyDate', nullable: true })
  updatedAt: Date;

  @Column({ length: 50, name: 'ModifyBy', nullable: true })
  updatedBy: string;

  @Column({ length: 50, name: 'MDCode', nullable: true })
  code: string;
}
