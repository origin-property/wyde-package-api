import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { Unit } from '../projects/entities/unit.entity';
import { UnitsService } from '../projects/units.service';

type UnitId = string;
type PackageUnitInfo = Aggregated<UnitId, Unit>;
type PackageUnitLoader = LoaderFrom<PackageUnitLoaderFactory>;

@Injectable()
class PackageUnitLoaderFactory extends DataloaderFactory<
  UnitId,
  PackageUnitInfo
> {
  constructor(private readonly unitsService: UnitsService) {
    super();
  }

  async load(ids: UnitId[], context: ExecutionContext) {
    const results: Unit[] = await this.unitsService.getUnitWithIds(ids);
    return this.aggregateBy(results, (unit) => unit.id);
  }

  id(entity: PackageUnitInfo) {
    return entity.id;
  }
}

export { PackageUnitLoader, PackageUnitLoaderFactory };
