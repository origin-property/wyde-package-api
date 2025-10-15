import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { Floor } from './entities/floor.entity';
import { FloorsService } from './floors.service';

@DataloaderProvider()
export class FloorsLoader {
  constructor(private readonly floorsService: FloorsService) {}

  createDataloader() {
    return new DataLoader<number, Floor[]>(async (ids) =>
      this.floorsService.getFloorsWithIds(ids),
    );
  }
}
