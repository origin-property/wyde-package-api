import { Module } from '@nestjs/common';
import { PackagesResolver } from './packages.resolver';
import { PackagesService } from './packages.service';

@Module({
  providers: [PackagesResolver, PackagesService],
})
export class PackagesModule {}
