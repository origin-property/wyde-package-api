import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { Tower } from './entities/tower.entity';
import { TowersService } from './towers.service';

@DataloaderProvider()
export class TowersLoader {
  constructor(private readonly towersService: TowersService) {}

  createDataloader() {
    return new DataLoader<string, Tower[]>(async (ids) =>
      this.towersService.getTowersWithIds(ids),
    );
  }
}
