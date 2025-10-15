import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { SysREMPricelist } from './SysREMPricelist.entity';

@Entity('Sys_REM_PricelistDetails')
export class SysREMPricelistDetails {
  @PrimaryColumn({ name: 'PriceListDetailsID' })
  id: number;

  @Column({ name: 'PriceListID', nullable: false })
  priceId: number;

  @Column({ name: 'UnitID', length: 50, nullable: true })
  unitId: string;

  @Column({
    name: 'StandardPrice',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  standardPrice: number;

  @Column({
    name: 'IncAreaPrice',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  incAreaPrice: number;

  @Column({
    name: 'LocationPrice',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  locationPrice: number;

  @Column({
    name: 'SellingPrice',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  sellingPrice: number;

  @Column({
    name: 'DiscountAmount',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  discountAmount: number;

  @Column({ name: 'PercentBooking', type: 'float', nullable: true })
  percentBooking: number;

  @Column({
    name: 'BookingAmount',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  bookingAmount: number;

  @Column({ name: 'PercentContract', type: 'float', nullable: true })
  percentContract: number;

  @Column({
    name: 'ContractAmount',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  contractAmount: number;

  @Column({ name: 'PercentDown', type: 'float', nullable: true })
  percentDown: number;

  @Column({ name: 'DownPeriod', nullable: true })
  downPeriod: number;

  @Column({
    name: 'DownAmount',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  downAmount: number;

  @Column({
    name: 'Period01',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period01: number;

  @Column({
    name: 'Period02',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period02: number;

  @Column({
    name: 'Period03',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period03: number;

  @Column({
    name: 'Period04',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period04: number;

  @Column({
    name: 'Period05',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period05: number;

  @Column({
    name: 'Period06',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period06: number;

  @Column({
    name: 'Period07',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period07: number;

  @Column({
    name: 'Period08',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period08: number;

  @Column({
    name: 'Period09',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period09: number;

  @Column({
    name: 'Period10',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period10: number;

  @Column({
    name: 'Period11',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period11: number;

  @Column({
    name: 'Period12',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period12: number;

  @Column({
    name: 'Period13',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period13: number;

  @Column({
    name: 'Period14',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period14: number;

  @Column({
    name: 'Period15',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period15: number;

  @Column({
    name: 'Period16',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period16: number;

  @Column({
    name: 'Period17',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period17: number;

  @Column({
    name: 'Period18',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period18: number;

  @Column({
    name: 'Period19',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period19: number;

  @Column({
    name: 'Period20',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period20: number;

  @Column({
    name: 'Period21',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period21: number;

  @Column({
    name: 'Period22',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period22: number;

  @Column({
    name: 'Period23',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period23: number;

  @Column({
    name: 'Period24',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period24: number;

  @Column({
    name: 'Period25',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period25: number;

  @Column({
    name: 'Period26',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period26: number;

  @Column({
    name: 'Period27',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period27: number;

  @Column({
    name: 'Period28',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period28: number;

  @Column({
    name: 'Period29',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period29: number;

  @Column({
    name: 'Period30',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  period30: number;

  @Column({ name: 'CreateDate', nullable: true })
  createDate: Date;

  @Column({ name: 'CreateBy', length: 50, nullable: true })
  createBy: string;

  @Column({ name: 'ModifyDate', nullable: true })
  modifyDate: Date;

  @Column({ name: 'ModifyBy', length: 50, nullable: true })
  modifyBy: string;

  @Column({ name: 'isDelete', nullable: true })
  isDelete: boolean;

  @Column({
    name: 'Contract2Price',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  contract2Price: number;

  @Column({ name: 'ModelID', length: 50, nullable: true })
  modelID: string;

  @Column({ name: 'ZoneID', length: 50, nullable: true })
  zoneID: string;

  @Column({
    name: 'MarkUpPrice',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  markUpPrice: number;

  @Column({ name: 'IsHotdeal', nullable: true, default: false })
  isHotdeal: boolean;

  @Column({ name: 'PhaseID', length: 50, nullable: true })
  phaseID: string;

  @Column({ name: 'HotdealStartDate', nullable: true })
  hotdealStartDate: Date;

  @Column({ name: 'HotdealEndDate', nullable: true })
  hotdealEndDate: Date;

  @Column({
    name: 'DecorateAmount',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  decorateAmount: number;

  @Column({
    name: 'DecorateDiscount',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  decorateDiscount: number;

  @ManyToOne(() => SysREMPricelist, priceList => priceList.details, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'PriceListID' })
  priceList: Relation<SysREMPricelist>;
}
