import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenamePriceAddSellingPrice1760535437736
  implements MigrationInterface
{
  name = 'RenamePriceAddSellingPrice1760535437736';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // เปลี่ยนชื่อ column price → budgetPrice
    await queryRunner.query(
      `ALTER TABLE "product_variant" RENAME COLUMN "price" TO "budgetPrice"`,
    );

    // เพิ่ม column ใหม่ sellingPrice
    await queryRunner.query(
      `ALTER TABLE "product_variant" ADD "sellingPrice" numeric(10,2) NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // ลบ column sellingPrice
    await queryRunner.query(
      `ALTER TABLE "product_variant" DROP COLUMN "sellingPrice"`,
    );

    // เปลี่ยนชื่อ column budgetPrice → price กลับคืน
    await queryRunner.query(
      `ALTER TABLE "product_variant" RENAME COLUMN "budgetPrice" TO "price"`,
    );
  }
}
