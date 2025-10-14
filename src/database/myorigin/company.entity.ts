import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity({ name: 'company' })
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nameThai: string;

  @Column({ length: 100 })
  nameEng: string;

  @Column({ length: 3, name: 'comCode' })
  code: string;

  @Column({ length: 25 })
  subType: string;

  @Column({ length: 25 })
  holding: string;

  @OneToMany(() => Employee, (employee) => employee.company)
  employees: Relation<Employee[]>;
}
