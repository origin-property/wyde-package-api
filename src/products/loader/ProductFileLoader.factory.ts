import { File } from '@/files/entities/file.entity';
import { FilesService } from '@/files/files.service';
import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';

type ProductId = string;
type ProductFileInfo = Aggregated<ProductId, File>;
type ProductFileLoader = LoaderFrom<ProductFileLoaderFactory>;

@Injectable()
class ProductFileLoaderFactory extends DataloaderFactory<
  ProductId,
  ProductFileInfo
> {
  constructor(private readonly fileService: FilesService) {
    super();
  }

  async load(ids: ProductId[], context: ExecutionContext) {
    const results: File[] = await this.fileService.getFilesWithIds(ids);
    return this.aggregateBy(results, (file) => file.refId);
  }

  id(entity: ProductFileInfo) {
    return entity.id;
  }
}

export { ProductFileLoader, ProductFileLoaderFactory };
