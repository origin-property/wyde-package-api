import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Loader } from '@strv/nestjs-dataloader';
import DataLoader from 'dataloader';
import { Project } from './entities/project.entity';
import { Tower } from './entities/tower.entity';
import { Unit } from './entities/unit.entity';
import { ProjectsService } from './projects.service';
import {
  ProjectTowerLoader,
  ProjectTowerLoaderFactory,
} from './ProjectTowerLoader.factory';
import {
  ProjectUnitLoader,
  ProjectUnitLoaderFactory,
} from './ProjectUnitLoader.factory';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query(() => [Project], { name: 'projects' })
  async findAll() {
    return this.projectsService.findAll();
  }

  @Query(() => Project, { name: 'project' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.projectsService.findOne(id);
  }

  @ResolveField(() => [Unit], { name: 'units' })
  async units(
    @Parent() { id }: Project,
    @Loader(ProjectUnitLoaderFactory) units: ProjectUnitLoader,
  ) {
    const result = await units.load(id);
    return result?.values ?? [];
  }

  @ResolveField(() => [Tower], { name: 'towers' })
  async towers(
    @Parent() { id }: Project,
    @Loader(ProjectTowerLoaderFactory) towers: ProjectTowerLoader,
  ) {
    const result = await towers.load(id);
    return result?.values ?? [];
  }
}
