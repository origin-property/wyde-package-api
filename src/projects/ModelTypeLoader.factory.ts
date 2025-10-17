import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { ModelsService } from './models.service.js';
import { Model } from './entities/model.entity.js';
import { keyBy } from 'lodash';
import { ModelTypesService } from './model-types.serice.js';
import { ModelType } from './entities/model-type.entity.js';

type ModelTypeId = string;
type ModelTypeInfo = { id: ModelTypeId; values: ModelType };
type ModelTypeLoader = LoaderFrom<ModelTypeLoaderFactory>;

@Injectable()
class ModelTypeLoaderFactory extends DataloaderFactory<
  ModelTypeId,
  ModelTypeInfo
> {
  constructor(private readonly modelTypeService: ModelTypesService) {
    super();
  }

  async load(ids: ModelTypeId[], context: ExecutionContext) {
    const results: ModelType[] =
      await this.modelTypeService.getModelTypesWithIds(ids);

    return ids.map((id, index) => {
      return { id, values: results[index] };
    });
  }

  id(entity: ModelTypeInfo) {
    return entity.id;
  }
}

export { ModelTypeLoaderFactory, ModelTypeLoader };
