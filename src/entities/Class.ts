import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import Exam from './Exam';
import Professor from './Professor';
import Year from './Years';

@Entity('classes')
export default class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'year_id' })
  yearId: number;

  @OneToOne(() => Year, { eager: true })
  @JoinColumn({ name: 'year_id' })
  year: Year;

  @OneToMany(() => Exam, (exam) => exam.class)
  exams: Exam;

  @ManyToMany(() => Professor, (professor) => professor.id, { eager: true })
  @JoinTable({
    name: 'classes_professors',
    joinColumn: {
      name: 'class_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'professor_id',
      referencedColumnName: 'id',
    },
  })
  professors: Professor[];

  async getClasses() {
    return {
      id: this.id,
      name: this.name,
      year: this.year.name,
      professors: this.professors,
    };
  }
}
