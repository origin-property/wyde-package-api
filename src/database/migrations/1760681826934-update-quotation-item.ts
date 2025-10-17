import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateQuotationItem1760681826934 implements MigrationInterface {
    name = 'UpdateQuotationItem1760681826934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_14cdd5cf5b14961cb69d6e3e5e2"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD "product_id" uuid`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."product_id" IS 'รหัสสินค้า'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_a224f30e0a736c561070848d43d" FOREIGN KEY ("product_id") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_a224f30e0a736c561070848d43d"`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."product_id" IS 'รหัสสินค้า'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD "product_id" character varying`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_14cdd5cf5b14961cb69d6e3e5e2" FOREIGN KEY ("productId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
