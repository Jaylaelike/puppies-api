import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty()
  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  name: string;

  @ApiProperty()
  @Column()
  age: number;

  @ApiProperty()
  @Column()
  breed: string;

  @ApiProperty()
  @Column()
  color: string;

  @ManyToOne((type) => UserEntity, (adapter) => adapter.email)
  adapter: UserEntity;
}
