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
import { CategoriesByProductTypeLoader } from './loader/categories-by-product-type.loader';
import { CategoryLoader } from './loader/category.loader';
import { DataloadersService } from './loader/dataloaders.service';
import { ImagesByVariantLoader } from './loader/images-by-variant.loader';
import { OptionByIdLoader } from './loader/option-by-id.loader';
import { OptionValuesByOptionIdLoader } from './loader/option-values-by-option-id.loader';
import { OptionValuesByVariantLoader } from './loader/option-values-by-variant.loader';
import { OptionsByProductLoader } from './loader/options-by-product.loader';
import { PackageImageLoaderFactory } from './loader/PackageImageLoader.factory';
import { PackageItemLoaderFactory } from './loader/PackageItemLoader.factory';
import { PackageProjectLoaderFactory } from './loader/PackageProjectLoader.factory';
import { ProductByIdLoader } from './loader/product-by-id.loader';
import { ProductTypeByIdLoader } from './loader/product-type-by-id.loader';
import { ProductTypeLoader } from './loader/product-type.loader';
import { ProductFileLoaderFactory } from './loader/ProductFileLoader.factory';
import { VariantsByProductLoader } from './loader/variants-by-product.loader';
import { PackagesService } from './packages.service';
import { ProductOptionValueResolver } from './product-option-value.resolver';
import { ProductOptionResolver } from './product-option.resolver';
import { ProductTypesResolver } from './product-types.resolver';
import { ProductTypesService } from './product-types.service';
import { ProductVariantImagesResolver } from './product-variant-images.resolver';
import { ProductVariantImagesService } from './product-variant-images.service';
import {
  ProductByVariantIdLoader,
  ProductVariantLoader,
} from './product-variant.loader';
import { ProductVariantResolver } from './product-variant.resolver';
import { PackageItemsResolver, ProductsResolver } from './products.resolver';
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
    DataloadersService,
    ProductVariantResolver,
    ProductOptionValueResolver,
    ProductOptionResolver,
    ProductTypeLoader,
    CategoryLoader,
    VariantsByProductLoader,
    ImagesByVariantLoader,
    OptionByIdLoader,
    OptionValuesByOptionIdLoader,
    OptionValuesByVariantLoader,
    ProductByIdLoader,
    OptionsByProductLoader,
    ProductByVariantIdLoader,
    ProductVariantLoader,
    ProductVariantImagesResolver,
    ProductVariantImagesService,
    CategoryService,
    ProductTypesService,
    ProductTypesResolver,
    CategoryResolver,
    CategoriesByProductTypeLoader,
    ProductTypeByIdLoader,
    PackagesService,
    PackageItemsResolver,
    PackageItemLoaderFactory,
    PackageProjectLoaderFactory,
    PackageImageLoaderFactory,
    ProductFileLoaderFactory,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
