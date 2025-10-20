import { File } from '@/database/entities/file.entity';
import { QuotationItem } from '@/database/entities/quotation-item.entity';
import { QuotationPromotion } from '@/database/entities/quotation-promotion.entity';
import { Quotation } from '@/database/entities/quotation.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../files/files.module';
import { ProductsModule } from '../products/products.module';
import { ProjectsModule } from '../projects/projects.module';
import { UsersModule } from '../users/users.module';
import { QuotationItemsResolver } from './quotation-items.resolver';
import { QuotationItemsService } from './quotation-items.service';
import { QuotationPromotionsService } from './quotation-promotion.service';
import { QuotationFileLoaderFactory } from './loader/QuotationFileLoader.factory';
import { QuotationItemLoaderFactory } from './loader/QuotationItemLoader.factory';
import { QuotationItemPackageLoaderFactory } from './loader/QuotationItemPackageLoader.factory';
import { QuotationProjectLoaderFactory } from './loader/QuotationProjectLoader.factory';
import { QuotationPromotionDiscountPriceLoaderFactory } from './loader/QuotationPromotionDiscountPriceLoader.factory';
import { QuotationPromotionLoaderFactory } from './loader/QuotationPromotionLoader.factory';
import { QuotationPromotionVoucherPriceLoaderFactory } from './loader/QuotationPromotionVoucherPriceLoader.factory';
import { QuotationsResolver } from './quotations.resolver';
import { QuotationsService } from './quotations.service';
import { QuotationUnitLoaderFactory } from './loader/QuotationUnitLoader.factory';
import { QuotationUserLoaderFactory } from './loader/QuotationUserLoader.factory';
import { QuotationVariantLoaderFactory } from './loader/QuotationVariantLoader.factory';
import { ItemQuotationLoaderFactory } from './loader/ItemQuotationLoader.factory';
import { QuotationProductLoaderFactory } from './loader/QuotationProductLoader.factory';

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
    ProductsModule,
  ],
  providers: [
    QuotationsResolver,
    QuotationsService,
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
    QuotationVariantLoaderFactory,
    ItemQuotationLoaderFactory,
    QuotationProductLoaderFactory,
  ],
  exports: [QuotationsService, QuotationItemsService],
})
export class QuotationsModule {}
