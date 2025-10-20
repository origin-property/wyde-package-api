import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { ProductOptionValue } from '@/database/entities/product-option-value.entity';
import { ProductsService } from '@/products/products.service';

@DataloaderProvider()
export class OptionValuesByOptionIdLoader {
  constructor(private readonly productsService: ProductsService) {}

  createDataloader() {
    return new DataLoader<string, ProductOptionValue[]>(async (ids: string[]) =>
      this.productsService.findOptionValuesByOptionIds(ids),
    );
  }
}
