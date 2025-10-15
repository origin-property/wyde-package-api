import { CRM } from '@/config/data-source.service';
import { SysREMMasterModelType } from '@/database/crm/SysREMMasterModelType.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { keyBy } from 'lodash';
import { In, IsNull, Repository } from 'typeorm';

@Injectable()
export class ModelTypesService {
  constructor(
    @InjectRepository(SysREMMasterModelType, CRM)
    private readonly modelTypesRepository: Repository<SysREMMasterModelType>,
  ) {}

  async findAll() {
    return this.modelTypesRepository.find();
  }

  async findOne(id: string) {
    return this.modelTypesRepository.findOne({ where: { id } });
  }

  async getModelTypesWithIds(ids: readonly string[]) {
    const modelTypes = await this.modelTypesRepository.find({
      where: [
        { id: In(ids), isDelete: false },
        { id: In(ids), isDelete: IsNull() },
      ],
    });
    const key = keyBy(modelTypes, (modelType) => modelType.id);
    return ids.map((id) => key[id]);
  }
}
