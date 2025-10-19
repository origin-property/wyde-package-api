import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base';

@Entity()
@Index(['refId'])
export class File extends BaseEntity {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'uuidv7()',
  })
  id: string;

  @Column({ name: 'ref_id' })
  refId: string;

  @Column({ name: 'file_name' })
  fileName: string;

  @Column({ name: 'file_path' })
  filePath: string;

  @Column({ name: 'file_bucket' })
  fileBucket: string;

  @Column({ name: 'is_public', type: 'boolean' })
  isPublic: boolean;

  @Column({ name: 'project_id', length: 15, nullable: true })
  projectId: string;
}
