import { File } from '@/database/entities/file.entity';
import { QuotationItem } from '@/database/entities/quotation-item.entity';
import { QuotationPromotion } from '@/database/entities/quotation-promotion.entity';
import { Quotation } from '@/database/entities/quotation.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../files/files.module';
import { ProjectsModule } from '../projects/projects.module';
import { UsersModule } from '../users/users.module';
import { QuotationItemsResolver } from './quotation-items.resolver';
import { QuotationItemsService } from './quotation-items.service';
import { QuotationPromotionsService } from './quotation-promotion.service';
import { QuotationLoader } from './quotation.loader';
import { QuotationFileLoaderFactory } from './QuotationFileLoader.factory';
import { QuotationItemLoaderFactory } from './QuotationItemLoader.factory';
import { QuotationItemPackageLoaderFactory } from './QuotationItemPackageLoader.factory';
import { QuotationProjectLoaderFactory } from './QuotationProjectLoader.factory';
import { QuotationPromotionDiscountPriceLoaderFactory } from './QuotationPromotionDiscountPriceLoader.factory';
import { QuotationPromotionLoaderFactory } from './QuotationPromotionLoader.factory';
import { QuotationPromotionVoucherPriceLoaderFactory } from './QuotationPromotionVoucherPriceLoader.factory';
import { QuotationsResolver } from './quotations.resolver';
import { QuotationsService } from './quotations.service';
import { QuotationUnitLoaderFactory } from './QuotationUnitLoader.factory';
import { QuotationUserLoaderFactory } from './QuotationUserLoader.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Quotation,
      QuotationItem,
      QuotationPromotion,
      File,
    ]),
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
    QuotationItemPackageLoaderFactory,
    QuotationPromotionsService,
    QuotationPromotionLoaderFactory,
    QuotationPromotionDiscountPriceLoaderFactory,
    QuotationPromotionVoucherPriceLoaderFactory,
  ],
  exports: [QuotationsService, QuotationItemsService],
})
export class QuotationsModule {}
