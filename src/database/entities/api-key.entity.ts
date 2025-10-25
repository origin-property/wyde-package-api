import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('api_key')
@Index(['apiKey'], { unique: true })
export class ApiKey {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'uuidv7()',
  })
  id: string;

  @Column({ name: 'api_key' })
  apiKey: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'last_used_at', type: 'timestamptz', nullable: true })
  lastUsedAt: Date;

  @Column({
    name: 'usage_count',
    type: 'int',
    default: 0,
    comment: 'จำนวนการใช้งาน',
  })
  usageCount: number;
}
