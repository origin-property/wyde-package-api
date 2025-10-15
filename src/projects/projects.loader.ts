import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

@DataloaderProvider()
export class ProjectLoader {
  constructor(private readonly projectService: ProjectsService) {}

  createDataloader() {
    return new DataLoader<string, Project>(async (ids) =>
      this.projectService.getProjectWithIds(ids),
    );
  }
}
