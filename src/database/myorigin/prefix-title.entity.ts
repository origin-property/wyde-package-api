import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity({ name: 'prefixTitle' })
export class PrefixTitle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, name: 'titleThai' })
  nameThai: string;

  @Column({ length: 100, name: 'titleEng' })
  nameEng: string;

  @OneToMany(() => Employee, (employee) => employee.title)
  employees: Relation<Employee[]>;
}
