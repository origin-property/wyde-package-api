import { QuotationItem } from '@/database/entities/quotation-item.entity';
import { Quotation } from '@/database/entities/quotation.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from '../projects/projects.module';
import { QuotationItemsLoader } from './quotation-items.loader';
import { QuotationItemsResolver } from './quotation-items.resolver';
import { QuotationItemsService } from './quotation-items.service';
import { QuotationLoader } from './quotation.loader';
import { QuotationsResolver } from './quotations.resolver';
import { QuotationsService } from './quotations.service';
import { QuotationUnitLoaderFactory } from './QuotationUnitLoader.factory';
import { QuotationProjectLoaderFactory } from './QuotationProjectLoader.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quotation, QuotationItem]),
    ProjectsModule,
  ],
  providers: [
    QuotationsResolver,
    QuotationsService,
    QuotationLoader,
    QuotationItemsResolver,
    QuotationItemsService,
    QuotationItemsLoader,
    QuotationUnitLoaderFactory,
    QuotationProjectLoaderFactory,
  ],
  exports: [QuotationsService, QuotationItemsService],
})
export class QuotationsModule {}
