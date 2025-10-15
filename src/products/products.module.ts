import { Category } from '@/database/entities/category.entity';
import { ProductOptionValue } from '@/database/entities/product-option-value.entity';
import { ProductOption } from '@/database/entities/product-option.entity';
import { ProductType } from '@/database/entities/product-type.entity';
import { ProductVariantImage } from '@/database/entities/product-variant-image.entity';
import { ProductVariant } from '@/database/entities/product-variant.entity';
import { Product } from '@/database/entities/product.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataloaderModule } from '@tracworx/nestjs-dataloader';
import { CategoryLoader } from './dataloaders/category.loader';
import { DataloadersService } from './dataloaders/dataloaders.service';
import { ImagesByVariantLoader } from './dataloaders/images-by-variant.loader';
import { OptionByIdLoader } from './dataloaders/option-by-id.loader';
import { OptionValuesByOptionIdLoader } from './dataloaders/option-values-by-option-id.loader';
import { OptionValuesByVariantLoader } from './dataloaders/option-values-by-variant.loader';
import { OptionsByProductLoader } from './dataloaders/options-by-product.loader';
import { ProductByIdLoader } from './dataloaders/product-by-id.loader';
import { ProductTypeLoader } from './dataloaders/product-type.loader';
import { VariantsByProductLoader } from './dataloaders/variants-by-product.loader';
import { ProductOptionValueResolver } from './product-option-value.resolver';
import { ProductOptionResolver } from './product-option.resolver';
import { ProductVariantImagesResolver } from './product-variant-images.resolver';
import { ProductVariantImagesService } from './product-variant-images.service';
import {
  ProductByVariantIdLoader,
  ProductVariantLoader,
} from './product-variant.loader';
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
    ]),
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
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
