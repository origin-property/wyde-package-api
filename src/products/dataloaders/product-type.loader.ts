import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { ProductType } from '@/database/entities/product-type.entity';
import { ProductsService } from '@/products/products.service'; // (ตรวจสอบ Path ให้ถูกต้อง)

@DataloaderProvider()
export class ProductTypeLoader {
  constructor(private readonly productsService: ProductsService) {}

  createDataloader() {
    return new DataLoader<string, ProductType>(async (ids: string[]) =>
      this.productsService.findTypesByIds(ids),
    );
  }
}
