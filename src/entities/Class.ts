import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import ClassToProfessor from './ClassToProfessor';
import Year from './Years';

@Entity('classes')
export default class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Year, { eager: true })
  @JoinColumn({ name: 'year_id' })
  year: Year;

  @OneToMany(
    () => ClassToProfessor,
    (classToProfessor) => classToProfessor.professor
  )
  professors: ClassToProfessor;
}
