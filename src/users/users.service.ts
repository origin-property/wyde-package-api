import { Role } from '@/database/entities/role.entity';
import { User } from '@/database/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { keyBy } from 'lodash';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

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
    return this.userRepository.findOne({ where, relations: ['roles'] });
  }

  async getUserWithIds(ids: readonly string[]): Promise<User[]> {
    const users = await this.userRepository.find({ where: { id: In(ids) } });

    const key = keyBy(users, (user) => user.id);

    return ids.map((id) => key[id]);
  }
}
