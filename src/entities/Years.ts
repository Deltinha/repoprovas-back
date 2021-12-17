import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('years')
export default class Year {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
