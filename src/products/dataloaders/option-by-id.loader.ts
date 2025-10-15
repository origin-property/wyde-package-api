import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { ProductOption } from '@/database/entities/product-option.entity';
import { ProductsService } from '@/products/products.service';

@DataloaderProvider()
export class OptionByIdLoader {
  constructor(private readonly productsService: ProductsService) {}

  createDataloader() {
    return new DataLoader<string, ProductOption>(async (ids: string[]) =>
      this.productsService.findOptionsByIds(ids),
    );
  }
}
