import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { ProductType } from '@/database/entities/product-type.entity';
import { ProductTypesService } from '../product-types.service';

@DataloaderProvider()
export class ProductTypeByIdLoader {
  constructor(private readonly productTypesService: ProductTypesService) {}

  createDataloader() {
    return new DataLoader<string, ProductType>(async (ids: string[]) =>
      this.productTypesService.findByIds(ids),
    );
  }
}
