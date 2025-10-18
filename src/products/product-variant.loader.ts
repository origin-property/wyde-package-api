import { ProductVariant } from '@/database/entities/product-variant.entity';
import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { ProductsService } from './products.service';
import { ProductVariantModel } from './dto/productVariant.dto';

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

@DataloaderProvider()
export class ProductVariantLoader {
  constructor(private readonly productsService: ProductsService) {}

  createDataloader() {
    return new DataLoader<string, ProductVariant>(async (variantIds) => {
      return this.productsService.getProductVariantById(variantIds);
    });
  }
}
