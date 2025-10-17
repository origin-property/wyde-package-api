import { User } from '@/database/entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { keyBy } from 'lodash';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private readonly logger = new Logger(UsersService.name);

  async create(
    createUserInput: CreateUserInput,
    userId: string,
  ): Promise<User> {
    const user = this.userRepository.create({
      ...createUserInput,
      createdBy: userId,
      updatedBy: userId,
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(where: FindOptionsWhere<User>): Promise<User> {
    const user = await this.userRepository.findOne({
      where,
      relations: ['roles'],
    });

    return user;
  }

  async getUserWithIds(ids: readonly string[]): Promise<User[]> {
    return this.userRepository.find({ where: { id: In(ids) } });
  }
}
