import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { TowersService } from '../towers.service';
import { Tower } from '../dto/tower.dto';

type TowerId = string;
type ProjectTowerInfo = Aggregated<TowerId, Tower>;
type ProjectTowerLoader = LoaderFrom<ProjectTowerLoaderFactory>;

@Injectable()
class ProjectTowerLoaderFactory extends DataloaderFactory<
  TowerId,
  ProjectTowerInfo
> {
  constructor(private readonly towersService: TowersService) {
    super();
  }

  async load(ids: TowerId[], context: ExecutionContext) {
    const results: Tower[] = await this.towersService.getTowersWithIds(ids);

    return this.aggregateBy(results, (tower) => tower.projectId);
  }

  id(entity: ProjectTowerInfo) {
    return entity.id;
  }
}

export { ProjectTowerLoaderFactory, ProjectTowerLoader };
