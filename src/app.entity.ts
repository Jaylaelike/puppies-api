import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('puppies')
export class PuppyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;

  @Column()
  color: string;
}
