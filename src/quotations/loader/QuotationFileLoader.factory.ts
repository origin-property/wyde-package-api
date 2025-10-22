import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { File } from '../../files/dto/file.dto';
import { FilesService } from '../../files/files.service';
import { singleAggregateBy } from '../../shared/singleAggregateBy';

type QuotationId = string;
type QuotationFileInfo = { id: QuotationId; values: File };
type QuotationFileLoader = LoaderFrom<QuotationFileLoaderFactory>;

@Injectable()
class QuotationFileLoaderFactory extends DataloaderFactory<
  QuotationId,
  QuotationFileInfo
> {
  constructor(private readonly fileService: FilesService) {
    super();
  }

  async load(ids: QuotationId[], context: ExecutionContext) {
    const results: File[] = await this.fileService.getFileWithIds(ids);
    return singleAggregateBy<QuotationId, File>(results, (item) => item.refId);
  }

  id(entity: QuotationFileInfo) {
    return entity.id;
  }
}

export { QuotationFileLoader, QuotationFileLoaderFactory };
