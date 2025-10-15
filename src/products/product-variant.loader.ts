import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { ProductsService } from './products.service';
import { ProductVariantModel } from './entities/productVariant.entity';

@DataloaderProvider()
export class ProductByVariantIdLoader {
  constructor(private readonly productService: ProductsService) {}

  createDataloader() {
    return new DataLoader<string, ProductVariantModel>(async (variantIds) => {
      const result = await this.productService.findByVariantIds(variantIds);

      return result;
    });
  }
}
