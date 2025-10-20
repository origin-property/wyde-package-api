import { Category } from '@/database/entities/category.entity';
import { PackageDetail } from '@/database/entities/package-detail.entity';
import { PackageItem } from '@/database/entities/package-item.entity';
import { ProductOptionValue } from '@/database/entities/product-option-value.entity';
import { ProductOption } from '@/database/entities/product-option.entity';
import { ProductType } from '@/database/entities/product-type.entity';
import { ProductVariantImage } from '@/database/entities/product-variant-image.entity';
import { ProductVariant } from '@/database/entities/product-variant.entity';
import { Product } from '@/database/entities/product.entity';
import { FilesModule } from '@/files/files.module';
import { ProjectsModule } from '@/projects/projects.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataloaderModule } from '@tracworx/nestjs-dataloader';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { CategoryProductTypeLoaderFactory } from './loader/CategoryProductTypeLoader.factory';
import { PackageImageLoaderFactory } from './loader/PackageImageLoader.factory';
import { PackageItemLoaderFactory } from './loader/PackageItemLoader.factory';
import { PackageItemVariantLoaderFactory } from './loader/PackageItemVariantLoader.factory';
import { PackageProjectLoaderFactory } from './loader/PackageProjectLoader.factory';
import { ProductCategoryLoaderFactory } from './loader/ProductCategoryLoader.factory';
import { ProductFileLoaderFactory } from './loader/ProductFileLoader.factory';
import { ProductOptionLoaderFactory } from './loader/ProductOptionLoader.factory';
import { ProductTypeCategoryLoaderFactory } from './loader/ProductTypeCategoryLoader.factory';
import { ProductVariantLoaderFactory } from './loader/ProductVariantLoader.factory';
import { VariantImageLoaderFactory } from './loader/VariantImageLoader.factory';
import { VariantProductLoaderFactory } from './loader/VariantProductLoader.factory';
import { PackageItemsResolver } from './package-item.resolver';
import { PackagesService } from './packages.service';
import { ProductOptionValueResolver } from './product-option-value.resolver';
import { ProductOptionResolver } from './product-option.resolver';
import { ProductTypesResolver } from './product-types.resolver';
import { ProductTypesService } from './product-types.service';
import { ProductVariantImagesResolver } from './product-variant-images.resolver';
import { ProductVariantImagesService } from './product-variant-images.service';
import { ProductVariantResolver } from './product-variant.resolver';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [
    DataloaderModule,
    TypeOrmModule.forFeature([
      Product,
      ProductOptionValue,
      ProductOption,
      ProductVariant,
      ProductVariantImage,
      ProductType,
      Category,
      PackageDetail,
      PackageItem,
    ]),
    FilesModule,
    ProjectsModule,
  ],
  providers: [
    ProductsResolver,
    ProductsService,
    ProductVariantResolver,
    ProductOptionValueResolver,
    ProductOptionResolver,
    ProductVariantImagesResolver,
    ProductVariantImagesService,
    CategoryService,
    ProductTypesService,
    ProductTypesResolver,
    CategoryResolver,
    PackagesService,
    PackageItemsResolver,
    PackageItemLoaderFactory,
    PackageProjectLoaderFactory,
    PackageImageLoaderFactory,
    ProductFileLoaderFactory,
    CategoryProductTypeLoaderFactory,
    ProductTypeCategoryLoaderFactory,
    ProductCategoryLoaderFactory,
    ProductVariantLoaderFactory,
    ProductOptionLoaderFactory,
    VariantImageLoaderFactory,
    VariantProductLoaderFactory,
    PackageItemVariantLoaderFactory,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
