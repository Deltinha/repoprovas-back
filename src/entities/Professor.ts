import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import ClassToProfessor from './ClassToProfessor';

@Entity('professors')
export default class Professor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => ClassToProfessor,
    (classToProfessor: any) => classToProfessor.professor,
    { eager: true }
  )
  classToProfessors: ClassToProfessor;
}
