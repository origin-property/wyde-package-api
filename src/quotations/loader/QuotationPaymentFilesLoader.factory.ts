import { AttachmentType } from '@/shared/enums/file.enum';
import { Injectable, type ExecutionContext } from '@nestjs/common';
import { DataloaderFactory, type LoaderFrom } from '@strv/nestjs-dataloader';
import { File } from '../../files/dto/file.dto';
import { FilesService } from '../../files/files.service';

type QuotationId = string;
type QuotationPaymentFilesInfo = { id: QuotationId; values: File[] };
type QuotationPaymentFilesLoader =
  LoaderFrom<QuotationPaymentFilesLoaderFactory>;

@Injectable()
class QuotationPaymentFilesLoaderFactory extends DataloaderFactory<
  QuotationId,
  QuotationPaymentFilesInfo
> {
  constructor(private readonly fileService: FilesService) {
    super();
  }

  async load(ids: QuotationId[], context: ExecutionContext) {
    const results: File[] = await this.fileService.getFileWithIds(ids);
    return this.aggregateBy(
      results.filter((file) => file.attachmentType === AttachmentType.PAYMENT),
      (item) => item.refId,
    );
  }

  id(entity: QuotationPaymentFilesInfo) {
    return entity.id;
  }
}

export { QuotationPaymentFilesLoader, QuotationPaymentFilesLoaderFactory };
