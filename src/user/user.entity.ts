import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jsonwebtoken from 'jsonwebtoken';
import { UserRO } from './user.dto';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column('text')
  password: string;

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
    return jsonwebtoken.sign(
      {
        id,
        email,
      },
      process.env.USER_JWT_SECRET,
      { expiresIn: '7d' },
    );
  }
}
