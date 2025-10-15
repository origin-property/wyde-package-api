import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { Model } from './entities/model.entity';
import { ModelsService } from './models.service';

@DataloaderProvider()
export class ModelLoader {
  constructor(private readonly modelsService: ModelsService) {}

  createDataloader() {
    return new DataLoader<{ id: string; projectId: string }, Model>(
      async (ids) => this.modelsService.getModelWithIds(ids),
    );
  }
}
