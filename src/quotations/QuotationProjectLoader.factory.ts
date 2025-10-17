import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { Project } from '../projects/entities/project.entity';
import { ProjectsService } from '../projects/projects.service';

type ProjectId = string;
type QuotationProjectInfo = Aggregated<ProjectId, Project>;
type QuotationProjectLoader = LoaderFrom<QuotationProjectLoaderFactory>;

@Injectable()
class QuotationProjectLoaderFactory extends DataloaderFactory<
  ProjectId,
  QuotationProjectInfo
> {
  constructor(private readonly projectService: ProjectsService) {
    super();
  }

  async load(ids: ProjectId[], context: ExecutionContext) {
    const results: Project[] = await this.projectService.getProjectWithIds(ids);
    return this.aggregateBy(results, (project) => project.id);
  }

  id(entity: QuotationProjectInfo) {
    return entity.id;
  }
}

export { QuotationProjectLoader, QuotationProjectLoaderFactory };
