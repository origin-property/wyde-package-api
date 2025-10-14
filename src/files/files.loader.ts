import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { File } from './entities/file.entity';
import { FilesService } from './files.service';

@DataloaderProvider()
export class FileLoader {
  constructor(private readonly fileService: FilesService) {}

  createDataloader() {
    return new DataLoader<string, File>(async (ids) =>
      this.fileService.getFileWithIds(ids),
    );
  }
}

@DataloaderProvider()
export class FilesLoader {
  constructor(private readonly fileService: FilesService) {}

  createDataloader() {
    return new DataLoader<string, File[]>(async (ids) =>
      this.fileService.getFilesWithIds(ids),
    );
  }
}
