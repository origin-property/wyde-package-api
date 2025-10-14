import { Role } from '@/database/entities/role.entity';
import { User } from '@/database/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { keyBy } from 'lodash';
import { FindOptionsWhere, In, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(where: FindOptionsWhere<User>): Promise<User> {
    return this.userRepository.findOne({ where });
  }

  async getUserWithIds(ids: readonly string[]): Promise<User[]> {
    const users = await this.userRepository.find({ where: { id: In(ids) } });

    const key = keyBy(users, (user) => user.id);

    return ids.map((id) => key[id]);
  }
}
