import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { ProductTypesService } from '../product-types.service';
import { Category } from '@/database/entities/category.entity';

type ProductTypeId = string;
type ProductTypeCategoryInfo = Aggregated<ProductTypeId, Category>;
type ProductTypeCategoryLoader = LoaderFrom<ProductTypeCategoryLoaderFactory>;

@Injectable()
class ProductTypeCategoryLoaderFactory extends DataloaderFactory<
  ProductTypeId,
  ProductTypeCategoryInfo
> {
  constructor(private readonly productTypesService: ProductTypesService) {
    super();
  }

  async load(ids: ProductTypeId[], context: ExecutionContext) {
    const results =
      await this.productTypesService.findCategoriesByProductTypeIds(ids);

    return this.aggregateBy(results, (category) => category.productTypeId);
  }

  id(entity: ProductTypeCategoryInfo) {
    return entity.id;
  }
}

export { ProductTypeCategoryLoader, ProductTypeCategoryLoaderFactory };
