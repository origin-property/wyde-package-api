import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base';

@Entity()
@Index(['refId'])
export class File extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'ref_id', type: 'uuid' })
  refId: string;

  @Column({ name: 'file_id' })
  fileId: string;

  @Column({ name: 'file_type' })
  fileType: string;

  @Column({ name: 'file_name' })
  fileName: string;

  @Column({ name: 'file_folder' })
  fileFolder: string;

  @Column({ name: 'file_path' })
  filePath: string;

  @Column({ name: 'file_bucket' })
  fileBucket: string;

  @Column({ name: 'file_extension' })
  fileExtension: string;

  @Column({ name: 'is_public', type: 'boolean' })
  isPublic: boolean;
}
