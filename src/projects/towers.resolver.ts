import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Loader } from '@strv/nestjs-dataloader';
import { Floor } from './dto/floor.dto';
import { Tower } from './dto/tower.dto';
import {
  TowerFloorLoader,
  TowerFloorLoaderFactory,
} from './loader/TowerFloorLoader.factory';
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
    @Parent() { id }: Tower,
    @Loader(TowerFloorLoaderFactory) towers: TowerFloorLoader,
  ) {
    const result = await towers.load(id);
    return result?.values ?? [];
  }
}
