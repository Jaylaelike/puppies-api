import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PuppyDTO, PuppyRO } from './app.dto';
import { PuppyEntity } from './app.entity';
import { UserEntity } from './user/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(PuppyEntity)
    private puppyRepository: Repository<PuppyEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private toResponseObject(puppy: PuppyEntity): PuppyRO {
    const responseObject: any = {
      ...puppy,
      adapter: puppy.adapter.toResponseObject(false),
    };
    return responseObject;
  }

  private ensureOwnership(puppy: PuppyEntity, userId: string) {
    if (puppy.adapter.id !== userId) {
      throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED);
    }
  }
  getHello(): string {
    return 'Hello puppies!';
  }

  async register(userId: string, data: PuppyDTO): Promise<PuppyRO> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const puppy = await this.puppyRepository.create({ ...data, adapter: user });
    await this.puppyRepository.save(puppy);
    return this.toResponseObject(puppy);
  }

  async read(id: string): Promise<PuppyRO> {
    const puppy = await this.puppyRepository.findOne({
      where: {
        id,
      },
      relations: ['adapter'],
    });
    if (!puppy) {
      throw new HttpException('Puppy not found', HttpStatus.NOT_FOUND);
    }
    return this.toResponseObject(puppy);
  }

  async readAll(page = 1, newest?: boolean): Promise<PuppyDTO[]> {
    const puppies = await this.puppyRepository.find({
      take: 25,
      skip: 25 * (page - 1),
      order: newest && { created: 'DESC' },
    });
    return puppies;
  }

  async update(id: string, data: Partial<PuppyDTO>): Promise<PuppyDTO> {
    let puppy = await this.puppyRepository.findOne({
      where: {
        id,
      },
    });
    if (!puppy) {
      throw new HttpException('Puppy not found', HttpStatus.NOT_FOUND);
    }
    await this.puppyRepository.update(id, data);
    puppy = await this.puppyRepository.findOne({
      where: {
        id,
      },
    });
    return puppy;
  }

  async delete(id: string) {
    const puppy = await this.puppyRepository.findOne({
      where: {
        id,
      },
    });
    if (!puppy) {
      throw new HttpException('Puppy not found', HttpStatus.NOT_FOUND);
    }
    await this.puppyRepository.delete({ id });
    return puppy;
  }
}
