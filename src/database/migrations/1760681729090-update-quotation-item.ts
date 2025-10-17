import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateQuotationItem1760681729090 implements MigrationInterface {
    name = 'UpdateQuotationItem1760681729090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_abe7dd7d5bf735c40b6cf5c4b98"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_a224f30e0a736c561070848d43d"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP COLUMN "product_variant_id"`);
        await queryRunner.query(`CREATE TYPE "public"."quotation_item_product_type_enum" AS ENUM('PRODUCT', 'PACKAGE')`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD "product_type" "public"."quotation_item_product_type_enum" NOT NULL DEFAULT 'PRODUCT'`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."product_type" IS 'ประเภทสินค้า'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD "package_id" uuid`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD "special_price" numeric(18,2)`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."special_price" IS 'ราคาพิเศษ'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD "product_id" character varying`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_14cdd5cf5b14961cb69d6e3e5e2" FOREIGN KEY ("productId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_422cdff7f048a4dbf7f4b639f14" FOREIGN KEY ("package_id") REFERENCES "package_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_422cdff7f048a4dbf7f4b639f14"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_14cdd5cf5b14961cb69d6e3e5e2"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD "product_id" uuid`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP COLUMN "productId"`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."special_price" IS 'ราคาพิเศษ'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP COLUMN "special_price"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP COLUMN "package_id"`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."product_type" IS 'ประเภทสินค้า'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP COLUMN "product_type"`);
        await queryRunner.query(`DROP TYPE "public"."quotation_item_product_type_enum"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD "product_variant_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_a224f30e0a736c561070848d43d" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_abe7dd7d5bf735c40b6cf5c4b98" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
