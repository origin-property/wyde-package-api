import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { QuotationItem } from './entities/quotation-item.entity';
import { QuotationItemsService } from './quotation-items.service';

@DataloaderProvider()
export class QuotationItemsLoader {
  constructor(private readonly quotationItemsService: QuotationItemsService) {}

  createDataloader() {
    return new DataLoader<string, QuotationItem[]>(async (ids) =>
      this.quotationItemsService.getQuotationItemsWithIds(ids),
    );
  }
}
