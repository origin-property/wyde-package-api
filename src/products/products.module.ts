import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { Product } from '@/database/entities/product.entity';
import { ProductOptionValue } from '@/database/entities/product-option-value.entity';
import { ProductOption } from '@/database/entities/product-option.entity';
import { ProductVariant } from '@/database/entities/product-variant.entity';
import { ProductVariantImage } from '@/database/entities/product-variant-image.entity';
import { ProductType } from '@/database/entities/product-type.entity';
import { Category } from '@/database/entities/category.entity';
import { DataloadersService } from './dataloaders/dataloaders.service';
import { ProductVariantResolver } from './product-variant.resolver';
import { ProductOptionValueResolver } from './product-option-value.resolver';
import { ProductOptionResolver } from './product-option.resolver';
import { ProductTypeLoader } from './dataloaders/product-type.loader';
import { CategoryLoader } from './dataloaders/category.loader';
import { VariantsByProductLoader } from './dataloaders/variants-by-product.loader';
import { ImagesByVariantLoader } from './dataloaders/images-by-variant.loader';
import { OptionByIdLoader } from './dataloaders/option-by-id.loader';
import { OptionValuesByOptionIdLoader } from './dataloaders/option-values-by-option-id.loader';
import { OptionValuesByVariantLoader } from './dataloaders/option-values-by-variant.loader';
import { OptionsByProductLoader } from './dataloaders/options-by-product.loader';
import { ProductByIdLoader } from './dataloaders/product-by-id.loader';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataloaderModule } from '@tracworx/nestjs-dataloader';
import { ProductByVariantIdLoader } from './product-variant.loader';

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
  ],
})
export class ProductsModule {}
