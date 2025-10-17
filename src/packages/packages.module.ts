import { PackageItem as PackageItemEntity } from '@/database/entities/package-item.entity';
import { FilesModule } from '@/files/files.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from '../projects/projects.module';
import { PackageImageLoaderFactory } from './PackageImageLoader.factory';
import { PackageItemLoaderFactory } from './PackageItemLoader.factory';
import { PackageProjectLoaderFactory } from './PackageProjectLoader.factory';
import { PackageItemsResolver, PackagesResolver } from './packages.resolver';
import { PackagesService } from './packages.service';
import { PackageUnitLoaderFactory } from './PackageUnitLoader.factory';
import { Product as ProductEntity } from '@/database/entities/product.entity';
import { ProductVariant } from '@/database/entities/product-variant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      PackageItemEntity,
      ProductVariant,
    ]),
    FilesModule,
    ProjectsModule,
  ],
  providers: [
    PackagesResolver,
    PackageItemsResolver,
    PackagesService,
    PackageUnitLoaderFactory,
    PackageProjectLoaderFactory,
    PackageItemLoaderFactory,
    PackageImageLoaderFactory,
  ],
  exports: [PackagesService],
})
export class PackagesModule {}
