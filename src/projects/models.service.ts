import { CRM } from '@/config/data-source.service';
import { SysREMProjectModel } from '@/database/crm/SysREMProjectModel.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { keyBy, uniqBy } from 'lodash';
import { FindOptionsWhere, IsNull, Repository } from 'typeorm';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(SysREMProjectModel, CRM)
    private readonly modelsRepository: Repository<SysREMProjectModel>,
  ) {}

  async findAll(projectId: string) {
    return this.modelsRepository.find({ where: { projectId } });
  }

  async findOne(id: string) {
    return this.modelsRepository.findOne({ where: { id } });
  }

  async getModelWithIds(datas: readonly { id: string; projectId: string }[]) {
    const wheres: FindOptionsWhere<SysREMProjectModel>[] = [];
    const uniqModelIdsForQuery = uniqBy(datas, ({ id }) => id);

    for (const data of uniqModelIdsForQuery) {
      wheres.push({
        id: data.id,
        projectId: data.projectId,
        isDelete: IsNull(),
      });

      wheres.push({
        id: data.id,
        projectId: data.projectId,
        isDelete: false,
      });
    }
    const models = await this.modelsRepository.find({
      where: wheres,
    });
    const key = keyBy(models, (model) => `${model.projectId}-${model.id}`);
    return datas.map((data) => key[`${data.projectId}-${data.id}`]);
  }
}
