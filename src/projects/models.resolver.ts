import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Loader } from '@strv/nestjs-dataloader';
import { ModelType } from './dto/model-type.dto';
import { Model } from './dto/model.dto';
import {
  ModelFileLoader,
  ModelFileLoaderFactory,
} from './loader/ModelFileLoader.factory';
import {
  ModelTypeLoader,
  ModelTypeLoaderFactory,
} from './loader/ModelTypeLoader.factory';
import { ModelsService } from './models.service';

@Resolver(() => Model)
export class ModelsResolver {
  constructor(private readonly modelsService: ModelsService) {}

  @Query(() => [Model], { name: 'models' })
  async findAll(@Args('projectId', { type: () => ID }) projectId: string) {
    return this.modelsService.findAll(projectId);
  }

  @Query(() => Model, { name: 'model' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.modelsService.findOne(id);
  }

  @ResolveField(() => ModelType, { name: 'modelType' })
  async modelType(
    @Parent() { modelTypeId }: Model,
    @Loader(ModelTypeLoaderFactory) modelTypeLoader: ModelTypeLoader,
  ) {
    const result = await modelTypeLoader.load(modelTypeId);
    return result?.values ?? null;
  }

  @ResolveField(() => String, { nullable: true, description: 'รูปภาพรูปแบบ' })
  async fileUrl(
    @Parent() { id, projectId }: Model,
    @Loader(ModelFileLoaderFactory) modelLoader: ModelFileLoader,
  ) {
    const result = await modelLoader.load({ id, projectId });
    return result?.values ?? null;
  }
}
