import { CRM } from '@/config/data-source.service';
import { SysREMFloor } from '@/database/crm/SysREMFloor.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { groupBy } from 'lodash';
import { In, IsNull, Repository } from 'typeorm';

@Injectable()
export class FloorsService {
  constructor(
    @InjectRepository(SysREMFloor, CRM)
    private readonly floorsRepository: Repository<SysREMFloor>,
  ) {}

  async findAll(towerId: number) {
    return this.floorsRepository.find({ where: { towerId } });
  }

  async findOne(id: number) {
    return this.floorsRepository.findOne({ where: { id } });
  }

  async getFloorsWithIds(ids: readonly number[]) {
    return this.floorsRepository.find({
      where: [
        { towerId: In(ids), isDelete: false },
        { towerId: In(ids), isDelete: IsNull() },
      ],
      select: ['id', 'towerId', 'projectId', 'nameTh', 'nameEn'],
      order: { nameTh: 'ASC' },
    });
  }
}
