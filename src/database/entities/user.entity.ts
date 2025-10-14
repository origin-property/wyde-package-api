import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { BaseEntity } from './base';
import { Role } from './role.entity';

@Entity()
@Index(['employeeId'], { unique: true })
@Index(['username'], { unique: true })
@Index(['email'], { unique: true })
export class User extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  employeeId: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  firstnameThai: string;

  @Column({ nullable: true })
  lastnameThai: string;

  @Column({ nullable: true })
  firstnameEng: string;

  @Column({ nullable: true })
  lastnameEng: string;

  @Column({ default: 0 })
  securityCount: number;

  @ManyToMany(() => Role, (role) => role.users, {
    cascade: true,
  })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: Relation<Role[]>;
}
