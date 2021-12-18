import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Exam from './Exam';

@Entity('professors')
export default class Professor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Exam, (exam) => exam.professor)
  exams: Promise<Exam[]>;

  async getProfessors() {
    return {
      id: this.id,
      name: this.name,
      examsQty: (await this.exams).length,
    };
  }
}
