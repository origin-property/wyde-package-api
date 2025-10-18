import { Column, Entity, ManyToMany, PrimaryColumn, Relation } from 'typeorm';
import { BaseEntity } from './base';
import { User } from './user.entity';

@Entity()
export class Role extends BaseEntity {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'uuidv7()',
  })
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: Relation<User[]>;
}
