import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { ModelType } from './entities/model-type.entity';
import { Model } from './entities/model.entity';
import { ModelTypeLoader } from './model-types.loader';
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
    @Loader(ModelTypeLoader) modelTypeLoader: DataLoader<string, ModelType>,
  ) {
    return modelTypeId ? modelTypeLoader.load(modelTypeId) : null;
  }
}
