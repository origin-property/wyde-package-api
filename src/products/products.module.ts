import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { Product } from '../database/entities/product.entity';
import { ProductOptionValue } from '../database/entities/product-option-value.entity';
import { ProductOption } from '../database/entities/product-option.entity';
import { ProductVariant } from '../database/entities/product-variant.entity';
import { ProductVariantImage } from '../database/entities/product-variant-image.entity';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductOptionValue,
      ProductOption,
      ProductVariant,
      ProductVariantImage,
    ]),
  ],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
