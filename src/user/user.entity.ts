import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './user.dto';
import { PuppyEntity } from 'src/app.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @ApiProperty()
  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column('text')
  password: string;

  @OneToMany((type) => PuppyEntity, (puppy) => puppy.name)
  puppies: PuppyEntity[];

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  toResponseObject(showToken = true): UserRO {
    const { id, created, email, token } = this;
    const responseObject: any = { id, created, email };
    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
  private get token() {
    const { id, email } = this;
    return jwt.sign(
      {
        id,
        email,
      },
      process.env.USER_JWT_SECRET,
      { expiresIn: '7d' },
    );
  }
}
