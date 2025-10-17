import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateQuotationItem1760695524141 implements MigrationInterface {
    name = 'UpdateQuotationItem1760695524141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_422cdff7f048a4dbf7f4b639f14"`);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP COLUMN "package_id"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP COLUMN "special_price"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD "product_name" character varying`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."product_name" IS 'ชื่อสินค้า'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD "product_description" character varying`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."product_description" IS 'คำอธิบายสินค้า'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD "sku" character varying`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."sku" IS 'SKU สินค้า'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD "selling_price" numeric(18,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."selling_price" IS 'ราคาขายสินค้า'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD "budget_price" numeric(18,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."budget_price" IS 'ราคางบประมาณสินค้า'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."budget_price" IS 'ราคางบประมาณสินค้า'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP COLUMN "budget_price"`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."selling_price" IS 'ราคาขายสินค้า'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP COLUMN "selling_price"`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."sku" IS 'SKU สินค้า'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP COLUMN "sku"`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."product_description" IS 'คำอธิบายสินค้า'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP COLUMN "product_description"`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."product_name" IS 'ชื่อสินค้า'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP COLUMN "product_name"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD "special_price" numeric(18,2)`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD "package_id" uuid`);
        await queryRunner.query(`ALTER TABLE "product" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_422cdff7f048a4dbf7f4b639f14" FOREIGN KEY ("package_id") REFERENCES "package_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
