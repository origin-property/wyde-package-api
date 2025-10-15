import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { Product } from '@/database/entities/product.entity';
import { ProductsService } from '@/products/products.service';

@DataloaderProvider()
export class ProductByIdLoader {
  constructor(private readonly productsService: ProductsService) {}
  createDataloader() {
    return new DataLoader<string, Product>(async (ids: string[]) =>
      this.productsService.findProductsByIds(ids),
    );
  }
}
