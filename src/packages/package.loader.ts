import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { PackageItem } from './entities/package.entity';
import { PackagesService } from './packages.service';

@DataloaderProvider()
export class PackageItemLoader {
  constructor(private readonly packagesService: PackagesService) {}

  createDataloader() {
    return new DataLoader<string, PackageItem[]>(async (ids) =>
      this.packagesService.getPackageItemByPackageId(ids),
    );
  }
}
