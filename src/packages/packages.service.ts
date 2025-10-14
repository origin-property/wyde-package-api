import { Injectable } from '@nestjs/common';
import { CreatePackageInput } from './dto/create-package.input';
import { UpdatePackageInput } from './dto/update-package.input';

@Injectable()
export class PackagesService {
  create(createPackageInput: CreatePackageInput) {
    return 'This action adds a new package';
  }

  findAll() {
    return `This action returns all packages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} package`;
  }

  update(id: number, updatePackageInput: UpdatePackageInput) {
    return `This action updates a #${id} package`;
  }

  remove(id: number) {
    return `This action removes a #${id} package`;
  }
}
