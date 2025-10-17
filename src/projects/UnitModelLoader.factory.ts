import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { ModelsService } from './models.service.js';
import { Model } from './entities/model.entity.js';

type ModelId = { id: string; projectId: string };
type UnitModelInfo = { id: ModelId; values: Model };
type UnitModelLoader = LoaderFrom<UnitModelLoaderFactory>;

@Injectable()
class UnitModelLoaderFactory extends DataloaderFactory<ModelId, UnitModelInfo> {
  constructor(private readonly modelService: ModelsService) {
    super();
  }

  async load(ids: ModelId[], context: ExecutionContext) {
    const results: Model[] = await this.modelService.getModelWithIds(ids);

    return ids.map((id, index) => {
      return { id, values: results[index] };
    });
  }

  id(entity: UnitModelInfo) {
    return entity.id;
  }
}

export { UnitModelLoaderFactory, UnitModelLoader };
