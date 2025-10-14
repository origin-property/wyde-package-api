import { Role } from '@/database/entities/role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { Repository } from 'typeorm';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleInput: CreateRoleInput) {
    return this.roleRepository.save(createRoleInput);
  }

  async findAll() {
    return this.roleRepository.find();
  }

  async findOne(id: string) {
    return this.roleRepository.findOne({ where: { id } });
  }

  async update(id: string, updateRoleInput: UpdateRoleInput) {
    return this.roleRepository.update(id, updateRoleInput);
  }

  async remove(id: string) {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) {
      throw new GraphQLError('Role not found');
    }

    const deleted = await this.roleRepository.softDelete(id);

    return !!deleted.affected;
  }
}
