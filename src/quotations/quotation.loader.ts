import { Quotation } from '@/database/entities/quotation.entity';
import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { QuotationsService } from './quotations.service';

@DataloaderProvider()
export class QuotationLoader {
  constructor(private readonly quotationService: QuotationsService) {}

  createDataloader() {
    return new DataLoader<string, Quotation>(async (ids) =>
      this.quotationService.getQuotationWithIds(ids),
    );
  }
}
