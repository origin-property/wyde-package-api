import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { SysMasterProjects } from './SysMasterProjects.entity';

@Entity('Sys_REM_FileData')
export class SysREMFileData {
  @PrimaryColumn({ name: 'Id', length: 50 })
  id: string;

  @Column({ name: 'FileName', length: 255, nullable: true })
  name: string;

  @Column({ type: 'text', name: 'FileData', nullable: true })
  base64Image: string;

  @Column({ name: 'Process', length: 50, nullable: true })
  process: string;

  @Column({ name: 'ProjectID', length: 50, nullable: true })
  projectId: string;

  @Column({ name: 'RefID', length: 50, nullable: true })
  refId: string;

  @Column({ name: 'CreateDate', nullable: true })
  createDate: Date;

  @Column({ name: 'CreateBy', length: 50, nullable: true })
  createBy: string;

  @Column({ name: 'ModifyDate', nullable: true })
  modifyDate: Date;

  @Column({ name: 'ModifyBy', length: 50, nullable: true })
  modifyBy: string;

  @Column({ name: 'IsDelete', nullable: true })
  isDelete: boolean;

  @Column({ name: 'Remark', nullable: true })
  remark: string;

  @Column({ name: 'ContractID', length: 50, nullable: true })
  contractId: string;

  @Column({ name: 'ConnectionString', nullable: true })
  connectionString: string;

  @Column({ name: 'FileIndex', length: 255, nullable: true })
  fileIndex: string;

  @Column({ name: 'FilePath', nullable: true })
  filePath: string;

  @Column({ name: 'FileSize', length: 50, nullable: true })
  fileSize: string;

  @Column({ name: 'IsSync', nullable: true })
  isSync: boolean;

  @Column({ name: 'SyncDate', nullable: true })
  syncDate: Date;

  @ManyToOne(() => SysMasterProjects, project => project.files, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'ProjectID' })
  project: Relation<SysMasterProjects>;
}
