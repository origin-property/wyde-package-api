import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Loader } from '@strv/nestjs-dataloader';
import { Model } from './entities/model.entity';
import { Project } from './entities/project.entity';
import { Unit } from './entities/unit.entity';
import {
  UnitModelLoader,
  UnitModelLoaderFactory,
} from './UnitModelLoader.factory';
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
    @Loader(UnitModelLoaderFactory) modelLoader: UnitModelLoader,
  ) {
    const result = await modelLoader.load({ id: modelId, projectId });
    return result?.values ?? null;
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
