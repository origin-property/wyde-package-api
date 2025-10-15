import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PackagesService } from './packages.service';
import { PackageItemsResolver, PackagesResolver } from './packages.resolver';

import { Package as PackageEntity } from '@/database/entities/package.entity';

import { FilesModule } from '@/files/files.module';
import { PackageItemLoader } from './package.loader';
import { PackageItem as PackageItemEntity } from '@/database/entities/package-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PackageEntity, PackageItemEntity]),
    FilesModule,
  ],
  providers: [
    PackagesResolver,
    PackageItemsResolver,
    PackagesService,
    PackageItemLoader,
  ],
  exports: [PackagesService],
})
export class PackagesModule {}
