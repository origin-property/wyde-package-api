import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { File } from '../../files/entities/file.entity';
import { FilesService } from '../../files/files.service';

type PackageId = string;
type PackageImageInfo = Aggregated<PackageId, File>;
type PackageImageLoader = LoaderFrom<PackageImageLoaderFactory>;

@Injectable()
class PackageImageLoaderFactory extends DataloaderFactory<
  PackageId,
  PackageImageInfo
> {
  constructor(private readonly fileService: FilesService) {
    super();
  }

  async load(ids: PackageId[], context: ExecutionContext) {
    const results: File[] = await this.fileService.getFilesWithIds(ids);
    return this.aggregateBy(results, (file) => file.id);
  }

  id(entity: PackageImageInfo) {
    return entity.id;
  }
}

export { PackageImageLoader, PackageImageLoaderFactory };
