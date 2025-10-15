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

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
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
  ],
})
export class ProductsModule {}
