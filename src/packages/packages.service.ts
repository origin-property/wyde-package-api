import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePackageInput } from './dto/create-package.input';

import { Package as PackageEntity } from '@/database/entities/package.entity';
import { FilesService } from '@/files/files.service';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(PackageEntity)
    private readonly packageRepository: Repository<PackageEntity>,
    private readonly filesService: FilesService,
  ) {}
  async create(
    createPackageInput: CreatePackageInput,
    userId: string,
  ): Promise<PackageEntity> {
    const { name, description, projectId, unitId, isActive, images, items } =
      createPackageInput;

    const pkg = this.packageRepository.create({
      name,
      description,
      projectId,
      unitId,
      createdBy: userId,
      updatedBy: userId,
      isActive,
      items: items.map((item) => ({
        ...item,
        createdBy: userId,
        updatedBy: userId,
      })),
    });

    await Promise.all(
      images.map((image) =>
        this.filesService.create({ ...image, refId: pkg.id }, userId),
      ),
    );

    return this.packageRepository.save(pkg);
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
}
