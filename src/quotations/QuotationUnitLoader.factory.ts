import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { Unit } from '../projects/entities/unit.entity';
import { UnitsService } from '../projects/units.service';

type UnitId = string;
type QuotationUnitInfo = Aggregated<UnitId, Unit>;
type QuotationUnitLoader = LoaderFrom<QuotationUnitLoaderFactory>;

@Injectable()
class QuotationUnitLoaderFactory extends DataloaderFactory<
  UnitId,
  QuotationUnitInfo
> {
  constructor(private readonly unitsService: UnitsService) {
    super();
  }

  async load(ids: UnitId[], context: ExecutionContext) {
    const results: Unit[] = await this.unitsService.getUnitWithIds(ids);
    return this.aggregateBy(results, (unit) => unit.id);
  }

  id(entity: QuotationUnitInfo) {
    return entity.id;
  }
}

export { QuotationUnitLoader, QuotationUnitLoaderFactory };
