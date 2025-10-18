import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CreatePackageInput } from './dto/create-package.input';

import { PackageItem as PackageItemEntity } from '@/database/entities/package-item.entity';
import { ProductVariant as ProductVariantEntity } from '@/database/entities/product-variant.entity';
import { Product as ProductEntity } from '@/database/entities/product.entity';
import { FilesService } from '@/files/files.service';
import { UnitsService } from '@/projects/units.service';
import { ProductItemType } from '@/shared/enums/product.enum';
import dayjs from 'dayjs';
import { sumBy } from 'lodash';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(ProductVariantEntity)
    private readonly variantRepository: Repository<ProductVariantEntity>,

    @InjectRepository(PackageItemEntity)
    private readonly packageItemRepository: Repository<PackageItemEntity>,

    private readonly filesService: FilesService,

    private readonly unitService: UnitsService,
  ) {}
  async create(
    createPackageInput: CreatePackageInput,
    userId: string,
  ): Promise<ProductEntity> {
    const { name, description, projectId, modelId, isActive, images, items } =
      createPackageInput;

    // ตรวจสอบว่า ProductVariant ที่อ้างอิงมีอยู่จริงหรือไม่
    const variantIds = items.map(item => item.productVariantId);
    const existingVariants = await this.variantRepository.find({
      where: { id: In(variantIds) },
      select: ['id']
    });

    if (existingVariants.length !== variantIds.length) {
      const existingVariantIds = existingVariants.map(v => v.id);
      const missingVariantIds = variantIds.filter(id => !existingVariantIds.includes(id));
      throw new NotFoundException(`ProductVariants not found: ${missingVariantIds.join(', ')}`);
    }

    const newSku = await this.generateSKU();

    console.log(newSku);

    const productId = uuidv4();

    const product = await this.productRepository.save({
      id: productId,
      name,
      description,
      createdBy: userId,
      updatedBy: userId,
      isActive,
      itemType: ProductItemType.PACKAGE,
      packageItems: items.map((item, idx) => ({
        ...item,
        seq: idx + 1,
        createdBy: userId,
        updatedBy: userId,
      })),
      packageDetail: {
        productId,
        projectId,
        modelId,
      },
      variants: [
        {
          sku: newSku,
          budgetPrice: 0,
          sellingPrice: sumBy(items, 'specialPrice'),
          stock: 0,
        },
      ],
    });

    await Promise.all(
      images.map((image) =>
        this.filesService.create({ ...image, refId: product.id }, userId),
      ),
    );

    return product;
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find({
      where: {
        itemType: ProductItemType.PACKAGE,
      },
      relations: {
        packageDetail: true,
        variants: true,
      },
    });
  }

  async findAllByUnitId(unitId: string): Promise<ProductEntity[]> {
    const unit = await this.unitService.findOne(unitId);

    if (!unit) {
      throw new NotFoundException('Unit not found');
    }

    return await this.productRepository.find({
      where: {
        itemType: ProductItemType.PACKAGE,
        packageDetail: { modelId: unit.modelId, projectId: unit.projectId },
      },
      relations: {
        packageDetail: true,
      },
    });
  }

  async getPackageItemByProductId(
    ids: readonly string[],
  ): Promise<PackageItemEntity[]> {
    return this.packageItemRepository.find({
      where: { productId: In(ids) },
    });
  }

  private async generateSKU(): Promise<string> {
    const year = dayjs().format('YY');
    const month = dayjs().format('MM');

    const datePrefix = `${year}${month}`;

    const prefix = `PKG-${datePrefix}-`;

    const currentVariant = await this.variantRepository.findOne({
      where: {
        sku: Like(`${prefix}%`),
      },
      order: {
        createdAt: 'DESC',
      },
    });

    const currentSKU = currentVariant?.sku.split('-')[2] ?? '00000';
    const nextSKUNumber = parseInt(currentSKU) + 1;
    const nextSKU = nextSKUNumber.toString().padStart(5, '0');

    return `${prefix}${nextSKU}`;
  }
}
