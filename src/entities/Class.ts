import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import Exam from './Exam';
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

  @OneToMany(() => Exam, (exam) => exam.class)
  exams: Exam;

  getClasses() {
    return {
      id: this.id,
      name: this.name,
      year: this.year,
      // classToProfessors: this.classToProfessor,
    };
  }
}
