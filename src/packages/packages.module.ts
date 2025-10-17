import { PackageItem as PackageItemEntity } from '@/database/entities/package-item.entity';
import { Package as PackageEntity } from '@/database/entities/package.entity';
import { FilesModule } from '@/files/files.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from '../projects/projects.module';
import { PackageItemLoader } from './package.loader';
import { PackageItemsResolver, PackagesResolver } from './packages.resolver';
import { PackagesService } from './packages.service';
import { PackageUnitLoaderFactory } from './PackageUnitLoader.factory';
import { PackageProjectLoaderFactory } from './PackageProjectLoader.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([PackageEntity, PackageItemEntity]),
    FilesModule,
    ProjectsModule,
  ],
  providers: [
    PackagesResolver,
    PackageItemsResolver,
    PackagesService,
    PackageItemLoader,
    PackageUnitLoaderFactory,
    PackageProjectLoaderFactory,
  ],
  exports: [PackagesService],
})
export class PackagesModule {}
