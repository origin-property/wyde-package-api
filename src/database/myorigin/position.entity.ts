import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'position' })
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, name: 'positionThai' })
  nameThai: string;

  @Column({ length: 100, name: 'positionEng' })
  nameEng: string;

  @Column()
  sectionId: string;

  @Column({ length: 3 })
  band: string;
}
