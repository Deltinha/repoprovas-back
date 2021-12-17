import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import ClassProfessor from './ClassToProfessor';
import Type from './Type';

@Entity('exams')
export default class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column({ name: 'type_id' })
  typeId: number;

  @Column({ name: 'class_professor_id' })
  classProfessorId: number;

  @OneToOne(() => Type, { eager: true })
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @OneToOne(() => ClassProfessor, { eager: true })
  @JoinColumn({ name: 'class_professor_id' })
  classProfessor: ClassProfessor;

  getExam() {
    return {
      examName: this.name,
      link: this.link,
      type: this.type.name,
      class: this.classProfessor.class.name,
      professor: this.classProfessor.professor.name,
      year: this.classProfessor.class.year.name,
    };
  }
}
