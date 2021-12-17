import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('types')
export default class Type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
