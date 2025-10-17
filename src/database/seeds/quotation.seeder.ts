import dayjs from 'dayjs';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import {
  QuotationProductType,
  QuotationStatus,
} from '../../shared/enums/quotation.enum';
import { Quotation } from '../entities/quotation.entity';

export default class QuotationSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    console.log(`-------- Start QuotationSeeder --------`);

    const userId = '800efe5e-ac25-4608-ac88-4f967d9fcbba';

    const createdQuotations = Array.from({ length: 1000 }).map((_, index) => {
      const current = `000${index + 1}`;
      const code = `Q-${dayjs().format('YYMM')}-${current.slice(-4)}`;

      const customerFirstName = Math.random().toString(36).substring(2, 15);
      const customerLastName = Math.random().toString(36).substring(2, 15);
      const customerEmail =
        customerFirstName + '.' + customerLastName + '@example.com';
      const customerPhone = '0812345678';
      const customerAddress = '123 Main St, Anytown, USA';

      const items = Array.from({
        length: Math.floor(Math.random() * 10) + 1,
      }).map(() => {
        const productId = '0142c806-61c9-460d-938f-c7b537a11f3d';
        const productType = QuotationProductType.PRODUCT;
        const quantity = Math.floor(Math.random() * 10) + 1;
        const unitPrice = Math.floor(Math.random() * 1000) + 1;
        const totalPrice = quantity * unitPrice;
        const specialPrice = 0;

        return {
          productType,
          productId,
          quantity,
          specialPrice,
          unitPrice,
          totalPrice,
          createdBy: userId,
          updatedBy: userId,
        };
      });

      return dataSource.getRepository(Quotation).create({
        customerFirstName,
        customerLastName,
        customerPhone,
        customerEmail,
        customerAddress,
        status: QuotationStatus.PENDING,
        date: dayjs().toDate(),
        code,
        createdBy: userId,
        updatedBy: userId,
        projectId: 'PRK04',
        unitId: 'PRK04AA1007',
        unitNumber: 'A1007',
        items: items,
      });
    });

    await dataSource.getRepository(Quotation).save(createdQuotations);

    console.log(`-------- End QuotationSeeder --------\n`);
  }
}
