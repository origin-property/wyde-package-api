import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Unit } from './entities/unit.entity';
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
}
