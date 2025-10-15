import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { ModelType } from './entities/model-type.entity';
import { ModelTypesService } from './model-types.serice';

@DataloaderProvider()
export class ModelTypeLoader {
  constructor(private readonly modelTypesService: ModelTypesService) {}

  createDataloader() {
    return new DataLoader<string, ModelType>(async (ids) =>
      this.modelTypesService.getModelTypesWithIds(ids),
    );
  }
}
