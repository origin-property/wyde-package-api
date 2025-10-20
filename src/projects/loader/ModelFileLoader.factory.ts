import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { ModelsService } from '../models.service';

type ModelId = { id: string; projectId: string };
type ModelFileInfo = { id: ModelId; values: string };
type ModelFileLoader = LoaderFrom<ModelFileLoaderFactory>;

@Injectable()
class ModelFileLoaderFactory extends DataloaderFactory<ModelId, ModelFileInfo> {
  constructor(private readonly modelService: ModelsService) {
    super();
  }

  async load(ids: ModelId[], context: ExecutionContext) {
    const results: string[] = await this.modelService.getModelFileUrl(ids);

    return ids.map((id, index) => {
      return { id, values: results[index] };
    });
  }

  id(entity: ModelFileInfo) {
    return entity.id;
  }
}

export { ModelFileLoaderFactory, ModelFileLoader };
