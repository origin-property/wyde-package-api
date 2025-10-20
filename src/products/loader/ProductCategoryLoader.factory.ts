import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { Category } from '@/database/entities/category.entity';
import { ProductsService } from '@/products/products.service';

type CategoryId = string;
type ProductCategoryInfo = { id: CategoryId; values: Category };
type ProductCategoryLoader = LoaderFrom<ProductCategoryLoaderFactory>;

@Injectable()
class ProductCategoryLoaderFactory extends DataloaderFactory<
  CategoryId,
  ProductCategoryInfo
> {
  constructor(private readonly productsService: ProductsService) {
    super();
  }

  async load(ids: CategoryId[], context: ExecutionContext) {
    const results = await this.productsService.findCategoriesByIds(ids);
    return ids.map((id, index) => {
      return { id, values: results[index] };
    });
  }

  id(entity: ProductCategoryInfo) {
    return entity.id;
  }
}

export { ProductCategoryLoader, ProductCategoryLoaderFactory };
