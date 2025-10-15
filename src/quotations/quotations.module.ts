import { QuotationItem } from '@/database/entities/quotation-item.entity';
import { Quotation } from '@/database/entities/quotation.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotationItemsLoader } from './quotation-items.loader';
import { QuotationItemsResolver } from './quotation-items.resolver';
import { QuotationItemsService } from './quotation-items.service';
import { QuotationLoader } from './quotation.loader';
import { QuotationsResolver } from './quotations.resolver';
import { QuotationsService } from './quotations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quotation, QuotationItem])],
  providers: [
    QuotationsResolver,
    QuotationsService,
    QuotationLoader,
    QuotationItemsResolver,
    QuotationItemsService,
    QuotationItemsLoader,
  ],
  exports: [QuotationsService, QuotationItemsService],
})
export class QuotationsModule {}
