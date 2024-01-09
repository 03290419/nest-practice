import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('log')
export class Log {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255 })
  message: string;

  @Column({ length: 10 })
  level: string;

  @Column('text')
  stack: string;

  @Column({ type: 'text', nullable: true })
  context: string;
}
