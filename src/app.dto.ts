import { IsNotEmpty } from 'class-validator';

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
