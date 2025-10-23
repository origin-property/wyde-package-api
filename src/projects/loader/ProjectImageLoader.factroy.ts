import { SysMasterProjects } from '@/database/crm/SysMasterProjects.entity';
import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { singleAggregateBy } from '../../shared/singleAggregateBy';
import { ProjectsService } from '../projects.service';

type ProjectImageId = string;
type ProjectImageInfo = { id: ProjectImageId; values: SysMasterProjects };
type ProjectImageLoader = LoaderFrom<ProjectImageLoaderFactory>;

@Injectable()
class ProjectImageLoaderFactory extends DataloaderFactory<
  ProjectImageId,
  ProjectImageInfo
> {
  constructor(private readonly projectsService: ProjectsService) {
    super();
  }

  async load(ids: ProjectImageId[], context: ExecutionContext) {
    const results: SysMasterProjects[] =
      await this.projectsService.getBase64ImagesWithIds(ids);

    return singleAggregateBy<ProjectImageId, SysMasterProjects>(
      results,
      (item) => item.id,
    );
  }

  id(entity: ProjectImageInfo) {
    return entity.id;
  }
}

export { ProjectImageLoader, ProjectImageLoaderFactory };
