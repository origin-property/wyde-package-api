import { CRM } from '@/config/data-source.service';
import { SysMasterProjects } from '@/database/crm/SysMasterProjects.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { keyBy } from 'lodash';
import { In, IsNull, Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(SysMasterProjects, CRM)
    private readonly projectsRepository: Repository<SysMasterProjects>,
  ) {}

  async findAll() {
    return this.projectsRepository.find({
      where: [
        {
          isDelete: false,
          type: 'C',
        },
        {
          isDelete: IsNull(),
          type: 'C',
        },
      ],
      select: ['id', 'nameTh', 'nameEn'],
    });
  }

  async findOne(id: string) {
    return this.projectsRepository.findOne({ where: { id } });
  }

  async getProjectWithIds(ids: readonly string[]) {
    const projects = await this.projectsRepository.find({
      where: [
        { id: In(ids), isDelete: false, type: 'C' },
        { id: In(ids), isDelete: IsNull(), type: 'C' },
      ],
      select: ['id', 'nameTh', 'nameEn'],
    });
    const key = keyBy(projects, (project) => project.id);
    return ids.map((id) => key[id]);
  }
}
