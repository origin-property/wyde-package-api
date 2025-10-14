import { File } from '@/database/entities/file.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileLoader, FilesLoader } from './files.loader';
import { FilesResolver } from './files.resolver';
import { FilesService } from './files.service';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FilesResolver, FilesService, FileLoader, FilesLoader],
  exports: [FilesService],
})
export class FilesModule {}
