import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity('user')
export class User {
  @PrimaryColumn('uuid', { update: false })
  id: string;

  @Column({ length: 30, nullable: false, update: false })
  username: string;

  @Column({ nullable: true, update: false, select: false })
  password: string;

  @Column({ type: 'timestamp', nullable: true, update: false, select: false })
  lastLogin: Date;

  @Column({ length: 1, nullable: true, update: false, select: false })
  status: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
    update: false,
    select: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    update: false,
    select: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
    update: false,
    select: false,
  })
  deletedAt: Date;

  @OneToOne(() => Employee, (employee) => employee.user)
  @JoinColumn({ name: 'id' })
  employee: Relation<Employee>;
}
