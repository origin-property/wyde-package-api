import { Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { BaseEntity } from './base';
import { QuotationItem } from './quotation-item.entity';

@Entity()
export class Quotation extends BaseEntity {
  @PrimaryColumn({
    default: () => 'uuidv7()',
  })
  id: string;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  date: Date;

  @Column({ unique: true })
  code: string;

  @Column({ name: 'customer_first_name', nullable: true })
  customerFirstName: string;

  @Column({ name: 'customer_last_name', nullable: true })
  customerLastName: string;

  @Column({ name: 'customer_phone', nullable: true })
  customerPhone: string;

  @Column({ name: 'customer_email', nullable: true })
  customerEmail: string;

  @Column({ name: 'customer_address', type: 'text', nullable: true })
  customerAddress: string;

  @OneToMany(() => QuotationItem, (item) => item.quotation, {
    cascade: true,
  })
  items: Relation<QuotationItem[]>;
}
