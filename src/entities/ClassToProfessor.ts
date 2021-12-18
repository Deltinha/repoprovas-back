import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import Class from './Class';
import Professor from './Professor';

@Entity('classes_professors')
export default class ClassToProfessor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'professor_id' })
  professorId: number;

  @Column({ name: 'class_id' })
  classId: number;

  @ManyToOne(() => Class, (_class) => _class.id)
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @ManyToOne(() => Professor, (professor: any) => professor.classes)
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;
}
