import dayjs from 'dayjs';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Quotation } from '../entities/quotation.entity';

export default class QuotationSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    console.log(`-------- Start QuotationSeeder --------`);

    const userId = '800efe5e-ac25-4608-ac88-4f967d9fcbba';

    const createdQuotations = Array.from({ length: 10 }).map((_, index) => {
      const current = `000${index + 1}`;
      const code = `Q-${dayjs().format('YYMM')}-${current.slice(-4)}`;

      return dataSource.getRepository(Quotation).create({
        customerFirstName: 'John',
        customerLastName: 'Doe',
        customerPhone: '0812345678',
        customerEmail: 'john.doe@example.com',
        customerAddress: '123 Main St, Anytown, USA',
        date: dayjs().toDate(),
        code,
        createdBy: userId,
        updatedBy: userId,
        items: [
          {
            productVariantId: '0142c806-61c9-460d-938f-c7b537a11f3d',
            productId: 'c9d755bf-6a0c-465c-b58b-5aca792eb2b7',
            quantity: 10,
            unitPrice: 13990.0,
            totalPrice: 13990.0 * 10,
            createdBy: userId,
            updatedBy: userId,
          },
        ],
      });
    });

    await dataSource.getRepository(Quotation).save(createdQuotations);

    console.log(`-------- End QuotationSeeder --------\n`);
  }
}
