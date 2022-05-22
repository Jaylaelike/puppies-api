import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user/user.entity';

@Entity('puppies')
export class PuppyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

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

  @ManyToOne((type) => UserEntity, (adapter) => adapter.email)
  adapter: UserEntity;
}
