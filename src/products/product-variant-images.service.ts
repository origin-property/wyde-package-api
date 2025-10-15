import { ProductVariantImage } from '@/database/entities/product-variant-image.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductVariantImagesService {
  constructor(
    @InjectRepository(ProductVariantImage)
    private readonly imageRepository: Repository<ProductVariantImage>,
  ) {}

  async findAll(productVariantId: string): Promise<ProductVariantImage[]> {
    return this.imageRepository.find({
      where: { isMain: true, productVariantId },
      order: { sortOrder: 'ASC' },
    });
  }

  async findOne(id: string): Promise<ProductVariantImage> {
    return this.imageRepository.findOne({ where: { id } });
  }
}
