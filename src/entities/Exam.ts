import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import ClassToProfessor from './ClassToProfessor';
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

  @OneToOne(() => ClassToProfessor, { eager: true })
  @JoinColumn({ name: 'class_professor_id' })
  classProfessor: ClassToProfessor;

  getExam() {
    return {
      examName: this.name,
      link: this.link,
      type: this.type.name,
      class: this.classProfessor.classId,
      professor: this.classProfessor.professorId,
      year: this.classProfessor.class.year.name,
    };
  }
}
