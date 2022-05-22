import { IsNotEmpty } from 'class-validator';
import { UserRO } from './user/user.dto';

export class PuppyDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  breed: string;

  @IsNotEmpty()
  color: string;
}

export class PuppyRO {
  id?: string;
  updated: Date;
  created: Date;
  name: string;
  age: number;
  breed: string;
  color: string;
  email: UserRO;
}
