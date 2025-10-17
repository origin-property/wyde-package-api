import { CRM } from '@/config/data-source.service';
import { SysREMTower } from '@/database/crm/SysREMTower.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { groupBy } from 'lodash';
import { In, IsNull, Repository } from 'typeorm';

@Injectable()
export class TowersService {
  constructor(
    @InjectRepository(SysREMTower, CRM)
    private readonly towersRepository: Repository<SysREMTower>,
  ) {}

  async findAll(projectId: string) {
    return this.towersRepository.find({ where: { projectId } });
  }

  async findOne(id: number) {
    return this.towersRepository.findOne({ where: { id } });
  }

  async getTowersWithIds(ids: readonly string[]) {
    return this.towersRepository.find({
      where: [
        { projectId: In(ids), isDelete: false },
        { projectId: In(ids), isDelete: IsNull() },
      ],
      select: ['id', 'projectId', 'nameTh', 'nameEn'],
      order: { id: 'ASC' },
    });
  }
}
