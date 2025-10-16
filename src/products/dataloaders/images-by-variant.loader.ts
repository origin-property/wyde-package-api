import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { ProductVariantImage } from '@/database/entities/product-variant-image.entity';
import { ProductsService } from '@/products/products.service';

@DataloaderProvider()
export class ImagesByVariantLoader {
  constructor(private readonly productsService: ProductsService) {}

  createDataloader() {
    return new DataLoader<string, ProductVariantImage[]>(
      async (ids: string[]) => this.productsService.findImagesByVariantIds(ids),
    );
  }
}
