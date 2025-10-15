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
import { Project } from './entities/project.entity';
import { Tower } from './entities/tower.entity';
import { Unit } from './entities/unit.entity';
import { ProjectsService } from './projects.service';
import { TowersLoader } from './towers.loader';
import { UnitsLoader } from './units.loader';

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
    @Loader(UnitsLoader) unitsLoader: DataLoader<string, Unit>,
  ) {
    return unitsLoader.load(id);
  }

  @ResolveField(() => [Tower], { name: 'towers' })
  async towers(
    @Parent() { id }: Project,
    @Loader(TowersLoader) towersLoader: DataLoader<string, Tower[]>,
  ) {
    return towersLoader.load(id);
  }
}
