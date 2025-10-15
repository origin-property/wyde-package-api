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
import { Floor } from './entities/floor.entity';
import { Tower } from './entities/tower.entity';
import { FloorsLoader } from './floors.loader';
import { TowersService } from './towers.service';

@Resolver(() => Tower)
export class TowersResolver {
  constructor(private readonly towersService: TowersService) {}

  @Query(() => [Tower], { name: 'towers' })
  async findAll(@Args('projectId', { type: () => ID }) projectId: string) {
    return this.towersService.findAll(projectId);
  }

  @Query(() => Tower, { name: 'tower' })
  async findOne(@Args('id', { type: () => ID }) id: number) {
    return this.towersService.findOne(id);
  }

  @ResolveField(() => [Floor], { name: 'floors' })
  async floors(
    @Parent() tower: Tower,
    @Loader(FloorsLoader) floorsLoader: DataLoader<number, Floor>,
  ) {
    return floorsLoader.load(tower.id);
  }
}
