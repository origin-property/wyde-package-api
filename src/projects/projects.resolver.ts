import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Loader } from '@strv/nestjs-dataloader';
import { Project } from './dto/project.dto';
import { Tower } from './dto/tower.dto';
import { Unit } from './dto/unit.dto';
import {
  ProjectTowerLoader,
  ProjectTowerLoaderFactory,
} from './loader/ProjectTowerLoader.factory';
import {
  ProjectUnitLoader,
  ProjectUnitLoaderFactory,
} from './loader/ProjectUnitLoader.factory';
import { ProjectsService } from './projects.service';

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
