import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import Class from './Class';
import Professor from './Professor';

@Entity('classes_professors')
export default class ClassToProfessor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Class, (_class) => _class.id, { eager: true })
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @ManyToOne(() => Professor, (professor: any) => professor.id, { eager: true })
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;

  // getClassesProfessors() {
  //   return {
  //     id: this.id,
  //     classId: this.class.id,
  //     professorId: this.professor.id,
  //   };
  // }
}
