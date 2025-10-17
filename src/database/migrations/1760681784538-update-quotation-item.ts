import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateQuotationItem1760681784538 implements MigrationInterface {
    name = 'UpdateQuotationItem1760681784538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_303cbbaa0114a41cd6654a0af14"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_422cdff7f048a4dbf7f4b639f14"`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."quotation_id" IS 'รหัสใบเสนอราคา'`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."product_id" IS 'รหัสสินค้า'`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."package_id" IS 'รหัสชุดสินค้า'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_303cbbaa0114a41cd6654a0af14" FOREIGN KEY ("quotation_id") REFERENCES "quotation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_422cdff7f048a4dbf7f4b639f14" FOREIGN KEY ("package_id") REFERENCES "package_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_422cdff7f048a4dbf7f4b639f14"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_303cbbaa0114a41cd6654a0af14"`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."package_id" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."product_id" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."quotation_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_422cdff7f048a4dbf7f4b639f14" FOREIGN KEY ("package_id") REFERENCES "package_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_303cbbaa0114a41cd6654a0af14" FOREIGN KEY ("quotation_id") REFERENCES "quotation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
