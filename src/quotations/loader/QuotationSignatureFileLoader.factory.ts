import { AttachmentType } from '@/shared/enums/file.enum';
import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { File } from '../../files/dto/file.dto';
import { FilesService } from '../../files/files.service';
import { singleAggregateBy } from '../../shared/singleAggregateBy';

type QuotationId = string;
type QuotationSignatureFileInfo = { id: QuotationId; values: File };
type QuotationSignatureFileLoader =
  LoaderFrom<QuotationSignatureFileLoaderFactory>;

@Injectable()
class QuotationSignatureFileLoaderFactory extends DataloaderFactory<
  QuotationId,
  QuotationSignatureFileInfo
> {
  constructor(private readonly fileService: FilesService) {
    super();
  }

  async load(ids: QuotationId[], context: ExecutionContext) {
    const results: File[] = await this.fileService.getFileWithIds(ids);
    return singleAggregateBy<QuotationId, File>(
      results.filter(
        (file) => file.attachmentType === AttachmentType.SIGNATURE,
      ),
      (item) => item.refId,
    );
  }

  id(entity: QuotationSignatureFileInfo) {
    return entity.id;
  }
}

export { QuotationSignatureFileLoader, QuotationSignatureFileLoaderFactory };
