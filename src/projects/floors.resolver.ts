import { Args, ID, Int, Query, Resolver } from '@nestjs/graphql';
import { Floor } from './entities/floor.entity';
import { FloorsService } from './floors.service';

@Resolver(() => Floor)
export class FloorsResolver {
  constructor(private readonly floorsService: FloorsService) {}

  @Query(() => [Floor], { name: 'floors' })
  async findAll(@Args('towerId', { type: () => Int }) towerId: number) {
    return this.floorsService.findAll(towerId);
  }

  @Query(() => Floor, { name: 'floor' })
  async findOne(@Args('id', { type: () => ID }) id: number) {
    return this.floorsService.findOne(id);
  }
}
