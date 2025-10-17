import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { Model } from './entities/model.entity';
import { Project } from './entities/project.entity';
import { Unit } from './entities/unit.entity';
import { ModelLoader } from './models.loader';
import { ProjectLoader } from './projects.loader';
import { UnitsService } from './units.service';

@Resolver(() => Unit)
export class UnitsResolver {
  constructor(private readonly unitsService: UnitsService) {}

  @Query(() => [Unit], { name: 'units' })
  async findAll(@Args('projectId', { type: () => ID }) projectId: string) {
    return this.unitsService.findAll(projectId);
  }

  @Query(() => Unit, { name: 'unit' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.unitsService.findOne(id);
  }

  @ResolveField(() => Model, { name: 'model' })
  async model(
    @Parent() { modelId, projectId }: Unit,
    @Loader(ModelLoader)
    loader: DataLoader<{ id: string; projectId: string }, Model>,
  ) {
    return modelId ? loader.load({ id: modelId, projectId }) : null;
  }

  @ResolveField(() => Project, { name: 'project' })
  async project(
    @Parent() { projectId }: Unit,
    @Loader(ProjectLoader)
    loader: DataLoader<string, Project>,
  ) {
    return loader.load(projectId);
  }
}
