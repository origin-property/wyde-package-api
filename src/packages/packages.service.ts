import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreatePackageInput } from './dto/create-package.input';

import { Package as PackageEntity } from '@/database/entities/package.entity';
import { PackageItem as PackageItemEntity } from '@/database/entities/package-item.entity';
import { FilesService } from '@/files/files.service';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(PackageEntity)
    private readonly packageRepository: Repository<PackageEntity>,

    @InjectRepository(PackageItemEntity)
    private readonly packageItemRepository: Repository<PackageItemEntity>,

    private readonly filesService: FilesService,
  ) {}
  async create(
    createPackageInput: CreatePackageInput,
    userId: string,
  ): Promise<PackageEntity> {
    const { name, description, projectId, unitId, isActive, images, items } =
      createPackageInput;

    const pkg = await this.packageRepository.save({
      name,
      description,
      projectId,
      unitId,
      createdBy: userId,
      updatedBy: userId,
      isActive,
      items: items.map((item, idx) => ({
        ...item,
        seq: idx + 1,
        createdBy: userId,
        updatedBy: userId,
      })),
    });

    await Promise.all(
      images.map((image) =>
        this.filesService.create({ ...image, refId: pkg.id }, userId),
      ),
    );

    return pkg;
  }

  async findAllByUnitId(unitId: string): Promise<PackageEntity[]> {
    return await this.packageRepository.find({ where: { unitId } });
  }

  async findOne(id: string): Promise<PackageEntity> {
    return this.packageRepository.findOne({ where: { id } });
  }

  // update(id: number, updatePackageInput: UpdatePackageInput) {
  //   return `This action updates a #${id} package`;
  // }

  async remove(id: string): Promise<boolean> {
    const result = await this.packageRepository.softDelete(id);
    return !!result.affected;
  }

  async getPackageItemByPackageId(
    ids: readonly string[],
  ): Promise<PackageItemEntity[][]> {
    const items = await this.packageItemRepository.find({
      where: { packageId: In(ids) },
    });

    return ids.map((id) => items.filter((item) => item.packageId === id));
  }
}
