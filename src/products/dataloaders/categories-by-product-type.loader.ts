import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { Category } from '@/database/entities/category.entity';
import { ProductTypesService } from '../product-types.service'; // (ตรวจสอบ Path)

@DataloaderProvider()
export class CategoriesByProductTypeLoader {
  constructor(private readonly productTypesService: ProductTypesService) {}

  createDataloader() {
    return new DataLoader<string, Category[]>(async (ids: string[]) =>
      this.productTypesService.findCategoriesByProductTypeIds(ids),
    );
  }
}
