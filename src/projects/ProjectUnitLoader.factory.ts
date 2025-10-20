import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { UnitsService } from './units.service';
import { Unit } from './dto/unit.dto';

type UnitId = string;
type ProjectUnitInfo = Aggregated<UnitId, Unit>;
type ProjectUnitLoader = LoaderFrom<ProjectUnitLoaderFactory>;

@Injectable()
class ProjectUnitLoaderFactory extends DataloaderFactory<
  UnitId,
  ProjectUnitInfo
> {
  constructor(private readonly unitsService: UnitsService) {
    super();
  }

  async load(ids: UnitId[], context: ExecutionContext) {
    const results: Unit[] = await this.unitsService.getUnitsWithIds(ids);

    return this.aggregateBy(results, (unit) => unit.projectId);
  }

  id(entity: ProjectUnitInfo) {
    return entity.id;
  }
}

export { ProjectUnitLoaderFactory, ProjectUnitLoader };
