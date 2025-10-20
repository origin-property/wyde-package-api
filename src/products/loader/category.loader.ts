import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { Category } from '@/database/entities/category.entity';
import { ProductsService } from '@/products/products.service';

@DataloaderProvider()
export class CategoryLoader {
  constructor(private readonly productsService: ProductsService) {}

  createDataloader() {
    return new DataLoader<string, Category>(async (ids: string[]) =>
      this.productsService.findCategoriesByIds(ids),
    );
  }
}
