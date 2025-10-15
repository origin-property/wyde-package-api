import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Sys_REM_TermOfPayments')
export class SysREMTermOfPayments {
  @PrimaryGeneratedColumn({ name: 'TOPID' })
  id: number;

  @Column({ name: 'TermOfName', length: 255, nullable: true })
  name: string;

  @Column({
    name: 'TransecGroup',
    length: 50,
    nullable: true,
  })
  group: string;

  @Column({ name: 'ProjectID', length: 10, nullable: true })
  projectId: string;

  @Column({ name: 'SBUID', length: 10, nullable: true })
  sbuId: string;

  @Column({ name: 'TowerID', nullable: true })
  towerId: number;

  @Column({ name: 'FloorID', nullable: true })
  floorId: number;

  @Column({ name: 'PhaseID', nullable: true })
  phaseId: number;

  @Column({ name: 'Zone', length: 50, nullable: true })
  zone: string;

  @Column({ name: 'StartDate', nullable: true })
  startDate: Date;

  @Column({ name: 'EndDate', nullable: true })
  expiredDate: Date;

  @Column({ name: 'REType', length: 50, nullable: true })
  reType: string;

  @Column({ name: 'ModelID', length: 50, nullable: true })
  modelId: string;

  @Column({ name: 'isPreBook', nullable: true })
  isPreBook: boolean;

  @Column({ name: 'UnitID', length: 50, nullable: true })
  unitId: string;

  @Column({ name: 'LimitPercent', type: 'float', nullable: true })
  limitPercent: number;

  @Column({ name: 'ContPercent', type: 'float', nullable: true })
  contPercent: number;

  @Column({ name: 'DownPercent', type: 'float', nullable: true })
  downPercent: number;

  @Column({
    name: 'DownAmount',
    type: 'numeric',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  downAmount: number;

  @Column({
    name: 'BookAmount',
    type: 'numeric',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  bookAmount: number;

  @Column({
    name: 'ContractAmount',
    type: 'numeric',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  contractAmount: number;

  @Column({ name: 'Period', nullable: true })
  period: number;

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

  @Column({ name: 'Period01', length: 50, nullable: true })
  period01: string;

  @Column({ name: 'Period02', length: 50, nullable: true })
  period02: string;

  @Column({ name: 'Period03', length: 50, nullable: true })
  period03: string;

  @Column({ name: 'Period04', length: 50, nullable: true })
  period04: string;

  @Column({ name: 'Period05', length: 50, nullable: true })
  period05: string;

  @Column({ name: 'Period06', length: 50, nullable: true })
  period06: string;

  @Column({ name: 'Period07', length: 50, nullable: true })
  period07: string;

  @Column({ name: 'Period08', length: 50, nullable: true })
  period08: string;

  @Column({ name: 'Period09', length: 50, nullable: true })
  period09: string;

  @Column({ name: 'Period10', length: 50, nullable: true })
  period10: string;

  @Column({ name: 'Period11', length: 50, nullable: true })
  period11: string;

  @Column({ name: 'Period12', length: 50, nullable: true })
  period12: string;

  @Column({ name: 'Period13', length: 50, nullable: true })
  period13: string;

  @Column({ name: 'Period14', length: 50, nullable: true })
  period14: string;

  @Column({ name: 'Period15', length: 50, nullable: true })
  period15: string;

  @Column({ name: 'Period16', length: 50, nullable: true })
  period16: string;

  @Column({ name: 'Period17', length: 50, nullable: true })
  period17: string;

  @Column({ name: 'Period18', length: 50, nullable: true })
  period18: string;

  @Column({ name: 'Period19', length: 50, nullable: true })
  period19: string;

  @Column({ name: 'Period20', length: 50, nullable: true })
  period20: string;

  @Column({ name: 'Period21', length: 50, nullable: true })
  period21: string;

  @Column({ name: 'Period22', length: 50, nullable: true })
  period22: string;

  @Column({ name: 'Period23', length: 50, nullable: true })
  period23: string;

  @Column({ name: 'Period24', length: 50, nullable: true })
  period24: string;

  @Column({ name: 'Period25', length: 50, nullable: true })
  period25: string;

  @Column({ name: 'Period26', length: 50, nullable: true })
  period26: string;

  @Column({ name: 'Period27', length: 50, nullable: true })
  period27: string;

  @Column({ name: 'Period28', length: 50, nullable: true })
  period28: string;

  @Column({ name: 'Period29', length: 50, nullable: true })
  period29: string;

  @Column({ name: 'Period30', length: 50, nullable: true })
  period30: string;

  @Column({ name: 'Period31', length: 50, nullable: true })
  period31: string;

  @Column({ name: 'Period32', length: 50, nullable: true })
  period32: string;

  @Column({ name: 'Period33', length: 50, nullable: true })
  period33: string;

  @Column({ name: 'Period34', length: 50, nullable: true })
  period34: string;

  @Column({ name: 'Period35', length: 50, nullable: true })
  period35: string;

  @Column({ name: 'Period36', length: 50, nullable: true })
  period36: string;

  @Column({ name: 'Period37', length: 50, nullable: true })
  period37: string;

  @Column({ name: 'Period38', length: 50, nullable: true })
  period38: string;

  @Column({ name: 'Period39', length: 50, nullable: true })
  period39: string;

  @Column({ name: 'Period40', length: 50, nullable: true })
  period40: string;

  @Column({ name: 'Period41', length: 50, nullable: true })
  period41: string;

  @Column({ name: 'Period42', length: 50, nullable: true })
  period42: string;

  @Column({ name: 'Period43', length: 50, nullable: true })
  period43: string;

  @Column({ name: 'Period44', length: 50, nullable: true })
  period44: string;

  @Column({ name: 'Period45', length: 50, nullable: true })
  period45: string;

  @Column({ name: 'Period46', length: 50, nullable: true })
  period46: string;

  @Column({ name: 'Period47', length: 50, nullable: true })
  period47: string;

  @Column({ name: 'Period48', length: 50, nullable: true })
  period48: string;

  @Column({
    name: 'Contract01',
    type: 'numeric',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  contract01: number;

  @Column({
    name: 'Contract02',
    type: 'numeric',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  contract02: number;

  @Column({
    name: 'Contract03',
    type: 'numeric',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  contract03: number;

  @Column({
    name: 'Contract04',
    type: 'numeric',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  contract04: number;

  @Column({ name: 'ContractPeriod', nullable: true })
  contractPeriod: number;
}
