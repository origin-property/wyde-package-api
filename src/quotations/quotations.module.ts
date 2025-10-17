import { QuotationItem } from '@/database/entities/quotation-item.entity';
import { Quotation } from '@/database/entities/quotation.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from '../projects/projects.module';
import { QuotationItemsResolver } from './quotation-items.resolver';
import { QuotationItemsService } from './quotation-items.service';
import { QuotationLoader } from './quotation.loader';
import { QuotationsResolver } from './quotations.resolver';
import { QuotationsService } from './quotations.service';
import { QuotationUnitLoaderFactory } from './QuotationUnitLoader.factory';
import { QuotationProjectLoaderFactory } from './QuotationProjectLoader.factory';
import { QuotationFileLoaderFactory } from './QuotationFileLoader.factory';
import { FilesModule } from '../files/files.module';
import { QuotationItemLoaderFactory } from './QuotationItemLoader.factory';
import { UsersModule } from '../users/users.module';
import { QuotationUserLoaderFactory } from './QuotationUserLoader.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quotation, QuotationItem]),
    ProjectsModule,
    FilesModule,
    UsersModule,
  ],
  providers: [
    QuotationsResolver,
    QuotationsService,
    QuotationLoader,
    QuotationItemsResolver,
    QuotationItemsService,
    QuotationUnitLoaderFactory,
    QuotationProjectLoaderFactory,
    QuotationFileLoaderFactory,
    QuotationItemLoaderFactory,
    QuotationUserLoaderFactory,
  ],
  exports: [QuotationsService, QuotationItemsService],
})
export class QuotationsModule {}
