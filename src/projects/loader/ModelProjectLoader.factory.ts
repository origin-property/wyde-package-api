import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { Project } from '../dto/project.dto';
import { ProjectsService } from '../projects.service';
import { singleAggregateBy } from '../../shared/singleAggregateBy';

type ProjectId = string;
type ModelProjectInfo = { id: ProjectId; values: Project };
type ModelProjectLoader = LoaderFrom<ModelProjectLoaderFactory>;

@Injectable()
class ModelProjectLoaderFactory extends DataloaderFactory<
  ProjectId,
  ModelProjectInfo
> {
  constructor(private readonly projectService: ProjectsService) {
    super();
  }

  async load(ids: ProjectId[], context: ExecutionContext) {
    const results: Project[] = await this.projectService.getProjectWithIds(ids);
    return singleAggregateBy<ProjectId, Project>(results, (item) => item.id);
  }

  id(entity: ModelProjectInfo) {
    return entity.id;
  }
}

export { ModelProjectLoader, ModelProjectLoaderFactory };
