import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PackagesService } from './packages.service';
import { PackageItemsResolver, PackagesResolver } from './packages.resolver';

import { Package as PackageEntity } from '@/database/entities/package.entity';

import { FilesModule } from '@/files/files.module';
import { PackageItemLoader } from './package.loader';
import { PackageItem as PackageItemEntity } from '@/database/entities/package-item.entity';
import { PackageUnitLoaderFactory } from './PackageUnitLoader.factory';
import { UnitsService } from '../projects/units.service';
import { CRM } from '../config/data-source.service';
import { SysMasterUnits } from '../database/crm/SysMasterUnits.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PackageEntity, PackageItemEntity]),
    TypeOrmModule.forFeature([SysMasterUnits], CRM),
    FilesModule,
  ],
  providers: [
    PackagesResolver,
    PackageItemsResolver,
    PackagesService,
    PackageItemLoader,
    UnitsService,
    PackageUnitLoaderFactory,
  ],
  exports: [PackagesService],
})
export class PackagesModule {}
