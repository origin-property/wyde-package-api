import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { ModelTypesService } from '../model-types.serice';
import { ModelType } from '../dto/model-type.dto';
import { singleAggregateBy } from '../../shared/singleAggregateBy';

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

    return singleAggregateBy<ModelTypeId, ModelType>(
      results,
      (item) => item.id,
    );
  }

  id(entity: ModelTypeInfo) {
    return entity.id;
  }
}

export { ModelTypeLoaderFactory, ModelTypeLoader };
