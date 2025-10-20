import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { ProductVariant } from '@/database/entities/product-variant.entity';
import { ProductsService } from '@/products/products.service';

@DataloaderProvider()
export class VariantsByProductLoader {
  constructor(private readonly productsService: ProductsService) {}

  createDataloader() {
    return new DataLoader<string, ProductVariant[]>(async (ids: string[]) =>
      this.productsService.findVariantsByProductIds(ids),
    );
  }
}
