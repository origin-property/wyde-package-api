import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity('vw_CSv2')
export class VwCSv2 {
  @ViewColumn({ name: 'UnitID' })
  unitId: string;

  @ViewColumn({ name: 'SaleID' })
  saleId: string;

  @ViewColumn({ name: 'LoanID' })
  loanId: string;

  @ViewColumn({ name: 'ContractID' })
  contractId: string;

  @ViewColumn({ name: 'ProjectID' })
  projectId: string;

  @ViewColumn({ name: 'TowerName' })
  towerName: string;

  @ViewColumn({ name: 'UnitNumber' })
  unitNumber: string;

  @ViewColumn({ name: 'FloorName' })
  floorName: string;

  @ViewColumn({ name: 'HouseNumber' })
  houseNumber: string;

  @ViewColumn({ name: 'CustomerName' })
  customerName: string;

  @ViewColumn({ name: 'TelePhone' })
  telePhone: string;

  @ViewColumn({ name: 'Email' })
  email: string;

  @ViewColumn({ name: 'ModelID' })
  modelId: string;

  @ViewColumn({ name: 'BookingDate' })
  bookingDate: Date;

  @ViewColumn({ name: 'CTTFDate' })
  cttfDate: Date;

  @ViewColumn({ name: 'TransferDate' })
  transferDate: Date;

  @ViewColumn({ name: 'Area' })
  area: number;

  @ViewColumn({ name: 'titledeedarea' })
  titledeedarea: number;

  @ViewColumn({ name: 'SellingPrice' })
  sellingPrice: number;

  @ViewColumn({ name: 'TotalSellingPrice' })
  totalSellingPrice: number;

  @ViewColumn({ name: 'Status' })
  status: string;

  @ViewColumn({ name: 'GetFreePrice' })
  getFreePrice: number;

  @ViewColumn({ name: 'BankSelected' })
  bankSelected: string;

  @ViewColumn({ name: 'isORI' })
  isORI: boolean;

  @ViewColumn({ name: 'ShowBookBank' })
  showBookBank: number;

  @ViewColumn({ name: 'DataSource' })
  dataSource: string;

  @ViewColumn({ name: 'Nationality' })
  nationality: string;

  @ViewColumn({ name: 'FloorID' })
  floorId: number;

  @ViewColumn({ name: 'AccountRoom' })
  accountRoom: string;

  @ViewColumn({ name: 'InternalIntroducerType' })
  internalIntroducerType: string;

  @ViewColumn({ name: 'ProjectType' })
  projectType: string;
}
