import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PackagesService } from './packages.service';
import { PackagesResolver } from './packages.resolver';

import { Package as PackageEntity } from '@/database/entities/package.entity';

import { FilesModule } from '@/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([PackageEntity]), FilesModule],
  providers: [PackagesResolver, PackagesService],
  exports: [PackagesService],
})
export class PackagesModule {}
