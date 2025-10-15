import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { Unit } from './entities/unit.entity';
import { UnitsService } from './units.service';

@DataloaderProvider()
export class UnitsLoader {
  constructor(private readonly unitsService: UnitsService) {}

  createDataloader() {
    return new DataLoader<string, Unit[]>(async (ids) =>
      this.unitsService.getUnitsWithIds(ids),
    );
  }
}

@DataloaderProvider()
export class UnitLoader {
  constructor(private readonly unitsService: UnitsService) {}

  createDataloader() {
    return new DataLoader<string, Unit>(async (ids) =>
      this.unitsService.getUnitWithIds(ids),
    );
  }
}
