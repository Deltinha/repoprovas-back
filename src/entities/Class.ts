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
    (classToProfessor) => classToProfessor.class,
    { eager: true }
  )
  classToProfessor: ClassToProfessor;

  getClasses() {
    return {
      id: this.id,
      name: this.name,
      year: this.year,
      classToProfessors: this.classToProfessor,
    };
  }
}
