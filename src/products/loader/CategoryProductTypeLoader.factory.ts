import { ProductType } from '@/database/entities/product-type.entity';
import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { ProductTypesService } from '../product-types.service';

type ProductTypeId = string;
type CategoryProductTypeInfo = { id: ProductTypeId; values: ProductType };
type CategoryProductTypeLoader = LoaderFrom<CategoryProductTypeLoaderFactory>;

@Injectable()
class CategoryProductTypeLoaderFactory extends DataloaderFactory<
  ProductTypeId,
  CategoryProductTypeInfo
> {
  constructor(private readonly productTypesService: ProductTypesService) {
    super();
  }

  async load(ids: ProductTypeId[], context: ExecutionContext) {
    const results = await this.productTypesService.findByIds(ids);

    return ids.map((id, index) => {
      return { id, values: results[index] };
    });
  }

  id(entity: CategoryProductTypeInfo) {
    return entity.id;
  }
}

export { CategoryProductTypeLoader, CategoryProductTypeLoaderFactory };
