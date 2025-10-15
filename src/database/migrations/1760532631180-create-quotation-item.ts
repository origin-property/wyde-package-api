import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQuotationItem1760532631180 implements MigrationInterface {
    name = 'CreateQuotationItem1760532631180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quotation_item" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" character varying NOT NULL DEFAULT uuidv7(), "quotation_id" character varying NOT NULL, "product_variant_id" uuid NOT NULL, "product_id" uuid, "quantity" integer NOT NULL DEFAULT '0', "unit_price" numeric(18,2) NOT NULL DEFAULT '0', "total_price" numeric(18,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_c7f10065ad2a53e2fb08919c3c3" PRIMARY KEY ("id")); COMMENT ON COLUMN "quotation_item"."quantity" IS 'จำนวนสินค้า'; COMMENT ON COLUMN "quotation_item"."unit_price" IS 'ราคา/หน่วย'; COMMENT ON COLUMN "quotation_item"."total_price" IS 'ราคารวม'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_303cbbaa0114a41cd6654a0af14" FOREIGN KEY ("quotation_id") REFERENCES "quotation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_abe7dd7d5bf735c40b6cf5c4b98" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_a224f30e0a736c561070848d43d" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_a224f30e0a736c561070848d43d"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_abe7dd7d5bf735c40b6cf5c4b98"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_303cbbaa0114a41cd6654a0af14"`);
        await queryRunner.query(`DROP TABLE "quotation_item"`);
    }

}
