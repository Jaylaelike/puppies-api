import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PuppyDTO } from './app.dto';
import { PuppyEntity } from './app.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(PuppyEntity)
    private puppyRepository: Repository<PuppyEntity>,
  ) {}
  getHello(): string {
    return 'Hello puppies!';
  }

  async register(data: PuppyDTO): Promise<PuppyDTO> {
    const puppy = await this.puppyRepository.create(data);
    await this.puppyRepository.save(puppy);
    return puppy;
  }

  async read(id: string): Promise<PuppyDTO> {
    const puppy = await this.puppyRepository.findOne({
      where: {
        id,
      },
    });
    if (!puppy) {
      throw new HttpException('Puppy not found', HttpStatus.NOT_FOUND);
    }
    return puppy;
  }

  async readAll(): Promise<PuppyDTO[]> {
    const puppies = await this.puppyRepository.find({});
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
