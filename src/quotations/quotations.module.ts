import { CRM } from '@/config/data-source.service';
import { SysMasterProjects } from '@/database/crm/SysMasterProjects.entity';
import { SysMasterUnits } from '@/database/crm/SysMasterUnits.entity';
import { SysREMProjectModel } from '@/database/crm/SysREMProjectModel.entity';
import { File } from '@/database/entities/file.entity';
import { ProductVariant } from '@/database/entities/product-variant.entity';
import { QuotationItem } from '@/database/entities/quotation-item.entity';
import { QuotationPromotion } from '@/database/entities/quotation-promotion.entity';
import { Quotation } from '@/database/entities/quotation.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../files/files.module';
import { ProductsModule } from '../products/products.module';
import { ProjectsModule } from '../projects/projects.module';
import { UsersModule } from '../users/users.module';
import { ItemQuotationLoaderFactory } from './loader/ItemQuotationLoader.factory';
import { QuotationItemLoaderFactory } from './loader/QuotationItemLoader.factory';
import { QuotationItemPackageLoaderFactory } from './loader/QuotationItemPackageLoader.factory';
import { QuotationPaymentFilesLoaderFactory } from './loader/QuotationPaymentFilesLoader.factory';
import { QuotationProductLoaderFactory } from './loader/QuotationProductLoader.factory';
import { QuotationProjectLoaderFactory } from './loader/QuotationProjectLoader.factory';
import { QuotationPromotionDiscountPriceLoaderFactory } from './loader/QuotationPromotionDiscountPriceLoader.factory';
import { QuotationPromotionLoaderFactory } from './loader/QuotationPromotionLoader.factory';
import { QuotationPromotionVoucherPriceLoaderFactory } from './loader/QuotationPromotionVoucherPriceLoader.factory';
import { QuotationSignatureFileLoaderFactory } from './loader/QuotationSignatureFileLoader.factory';
import { QuotationUnitLoaderFactory } from './loader/QuotationUnitLoader.factory';
import { QuotationUserLoaderFactory } from './loader/QuotationUserLoader.factory';
import { QuotationVariantLoaderFactory } from './loader/QuotationVariantLoader.factory';
import { QuotationItemsResolver } from './quotation-items.resolver';
import { QuotationItemsService } from './quotation-items.service';
import { QuotationPromotionsService } from './quotation-promotion.service';
import { QuotationsGenerateService } from './quotations-generate.service';
import { QuotationsController } from './quotations.controller';
import { QuotationsResolver } from './quotations.resolver';
import { QuotationsService } from './quotations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Quotation,
      QuotationItem,
      QuotationPromotion,
      ProductVariant,
      File,
    ]),
    TypeOrmModule.forFeature(
      [SysMasterProjects, SysMasterUnits, SysREMProjectModel],
      CRM,
    ),
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
    QuotationProductLoaderFactory,
    QuotationUnitLoaderFactory,
    QuotationProjectLoaderFactory,
    QuotationSignatureFileLoaderFactory,
    QuotationItemLoaderFactory,
    QuotationUserLoaderFactory,
    QuotationItemPackageLoaderFactory,
    QuotationPromotionsService,
    QuotationPromotionLoaderFactory,
    QuotationPromotionDiscountPriceLoaderFactory,
    QuotationPromotionVoucherPriceLoaderFactory,
    QuotationVariantLoaderFactory,
    ItemQuotationLoaderFactory,
    QuotationsGenerateService,
    QuotationProductLoaderFactory,
    QuotationPaymentFilesLoaderFactory,
  ],
  exports: [
    QuotationsService,
    QuotationItemsService,
    QuotationsGenerateService,
  ],
  controllers: [QuotationsController],
})
export class QuotationsModule {}
