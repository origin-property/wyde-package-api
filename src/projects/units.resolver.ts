import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Loader } from '@strv/nestjs-dataloader';
import { Model } from './dto/model.dto';
import { Project } from './dto/project.dto';
import { Unit } from './dto/unit.dto';
import {
  UnitModelLoader,
  UnitModelLoaderFactory,
} from './loader/UnitModelLoader.factory';
import {
  UnitProjectLoader,
  UnitProjectLoaderFactory,
} from './loader/UnitProjectLoader.factory';
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
    @Loader(UnitProjectLoaderFactory) projectLoader: UnitProjectLoader,
  ) {
    const result = await projectLoader.load(projectId);
    return result?.values || null;
  }
}
