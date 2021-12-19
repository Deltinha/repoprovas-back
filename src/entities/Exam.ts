import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Class from './Class';
import Professor from './Professor';
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

  @Column({ name: 'professor_id' })
  professorId: number;

  @Column({ name: 'class_id' })
  classId: number;

  @OneToOne(() => Type, { eager: true })
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @ManyToOne(() => Professor, (professor) => professor.id, { eager: true })
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;

  @ManyToOne(() => Class, (_class) => _class.id, { eager: true })
  @JoinColumn({ name: 'class_id' })
  class: Class;

  getExam() {
    return {
      name: this.name,
      link: this.link,
      type: this.type.name,
      class: this.class.name,
      professor: this.professor.name,
      year: this.class.year.name,
    };
  }
}
