import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { Project } from '../../projects/dto/project.dto';
import { ProjectsService } from '../../projects/projects.service';

type ProjectId = string;
type UnitProjectInfo = { id: ProjectId; values: Project };
type UnitProjectLoader = LoaderFrom<UnitProjectLoaderFactory>;

@Injectable()
class UnitProjectLoaderFactory extends DataloaderFactory<
  ProjectId,
  UnitProjectInfo
> {
  constructor(private readonly projectService: ProjectsService) {
    super();
  }

  async load(ids: ProjectId[], context: ExecutionContext) {
    const results: Project[] = await this.projectService.getProjectWithIds(ids);
    return ids.map((id, index) => {
      return { id, values: results[index] };
    });
  }

  id(entity: UnitProjectInfo) {
    return entity.id;
  }
}

export { UnitProjectLoader, UnitProjectLoaderFactory };
