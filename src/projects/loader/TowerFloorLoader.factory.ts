import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { Floor } from '../dto/floor.dto';
import { FloorsService } from '../floors.service';

type FloorId = number;
type TowerFloorInfo = Aggregated<FloorId, Floor>;
type TowerFloorLoader = LoaderFrom<TowerFloorLoaderFactory>;

@Injectable()
class TowerFloorLoaderFactory extends DataloaderFactory<
  FloorId,
  TowerFloorInfo
> {
  constructor(private readonly floorsService: FloorsService) {
    super();
  }

  async load(ids: number[], context: ExecutionContext) {
    const results: Floor[] = await this.floorsService.getFloorsWithIds(ids);

    return this.aggregateBy(results, (floor) => floor.towerId);
  }

  id(entity: TowerFloorInfo) {
    return entity.id;
  }
}

export { TowerFloorLoader, TowerFloorLoaderFactory };
