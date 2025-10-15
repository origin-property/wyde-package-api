import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Sys_REM_ModelPrice')
export class SysREMModelPrice {
  @PrimaryGeneratedColumn('increment', { name: 'ModelPriceID' })
  id: number;

  @Column({ name: 'ProjectID', length: 10 })
  projectId: string;

  @Column({ name: 'Unitnumber', length: 20 })
  unitNumber: string;

  @Column({ name: 'UpdateDate' })
  updateDate: Date;

  @Column({ name: 'ModelPrice', type: 'numeric', precision: 18, scale: 2 })
  modelPrice: number;
}
