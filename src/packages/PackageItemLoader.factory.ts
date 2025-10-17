import { Injectable, type ExecutionContext } from '@nestjs/common';
import {
  DataloaderFactory,
  type Aggregated,
  type LoaderFrom,
} from '@strv/nestjs-dataloader';
import { PackageItem } from '@/database/entities/package-item.entity';
import { PackagesService } from './packages.service';

type PackageId = string;
type PackageItemInfo = Aggregated<PackageId, PackageItem>;
type PackageItemLoader = LoaderFrom<PackageItemLoaderFactory>;

@Injectable()
class PackageItemLoaderFactory extends DataloaderFactory<
  PackageId,
  PackageItemInfo
> {
  constructor(private readonly packagesService: PackagesService) {
    super();
  }

  async load(ids: PackageId[], context: ExecutionContext) {
    const results: PackageItem[] =
      await this.packagesService.getPackageItemByProductId(ids);
    return this.aggregateBy(results, (project) => project.id);
  }

  id(entity: PackageItemInfo) {
    return entity.id;
  }
}

export { PackageItemLoader, PackageItemLoaderFactory };
