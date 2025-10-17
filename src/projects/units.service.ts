import { CRM } from '@/config/data-source.service';
import { SysMasterUnits } from '@/database/crm/SysMasterUnits.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { groupBy, keyBy } from 'lodash';
import { In, IsNull, Repository } from 'typeorm';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(SysMasterUnits, CRM)
    private readonly unitsRepository: Repository<SysMasterUnits>,
  ) {}

  async findAll(projectId: string) {
    return this.unitsRepository.find({
      where: [
        { projectId, isDelete: false },
        { projectId, isDelete: IsNull() },
      ],
      select: ['id', 'unitNumber', 'houseNumber', 'projectId', 'modelId'],
    });
  }

  async findOne(id: string) {
    return this.unitsRepository.findOne({ where: { id } });
  }

  async getUnitsWithIds(ids: readonly string[]) {
    return this.unitsRepository.find({
      where: [
        { projectId: In(ids), isDelete: false },
        { projectId: In(ids), isDelete: IsNull() },
      ],
      select: ['id', 'unitNumber', 'houseNumber', 'projectId', 'modelId'],
    });
  }

  async getUnitWithIds(ids: readonly string[]) {
    return this.unitsRepository.find({
      where: { id: In(ids) },
      select: ['id', 'unitNumber', 'houseNumber', 'projectId', 'modelId'],
    });
  }
}
