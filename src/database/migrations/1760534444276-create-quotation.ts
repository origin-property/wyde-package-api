import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQuotation1760534444276 implements MigrationInterface {
    name = 'CreateQuotation1760534444276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quotation_item" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" character varying NOT NULL DEFAULT uuidv7(), "quotation_id" character varying NOT NULL, "product_variant_id" uuid NOT NULL, "product_id" uuid, "quantity" integer NOT NULL DEFAULT '0', "unit_price" numeric(18,2) NOT NULL DEFAULT '0', "total_price" numeric(18,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_c7f10065ad2a53e2fb08919c3c3" PRIMARY KEY ("id")); COMMENT ON COLUMN "quotation_item"."quantity" IS 'จำนวนสินค้า'; COMMENT ON COLUMN "quotation_item"."unit_price" IS 'ราคา/หน่วย'; COMMENT ON COLUMN "quotation_item"."total_price" IS 'ราคารวม'`);
        await queryRunner.query(`CREATE TABLE "quotation" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" character varying NOT NULL DEFAULT uuidv7(), "date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "code" character varying NOT NULL, "customer_first_name" character varying, "customer_last_name" character varying, "customer_phone" character varying, "customer_email" character varying, "customer_address" text, "project_id" character varying NOT NULL, "unit_id" character varying NOT NULL, "unit_number" character varying NOT NULL, CONSTRAINT "UQ_4c3973c666b05afaf4ff9d140be" UNIQUE ("code"), CONSTRAINT "PK_596c572d5858492d10d8cf5383d" PRIMARY KEY ("id")); COMMENT ON COLUMN "quotation"."date" IS 'วันที่ใบเสนอราคา'; COMMENT ON COLUMN "quotation"."code" IS 'รหัสใบเสนอราคา'; COMMENT ON COLUMN "quotation"."customer_first_name" IS 'ชื่อลูกค้า'; COMMENT ON COLUMN "quotation"."customer_last_name" IS 'นามสกุลลูกค้า'; COMMENT ON COLUMN "quotation"."customer_phone" IS 'หมายเลขโทรศัพท์ลูกค้า'; COMMENT ON COLUMN "quotation"."customer_email" IS 'อีเมลลูกค้า'; COMMENT ON COLUMN "quotation"."customer_address" IS 'ที่อยู่ลูกค้า'; COMMENT ON COLUMN "quotation"."project_id" IS 'รหัสโครงการ'; COMMENT ON COLUMN "quotation"."unit_id" IS 'รหัสยูนิต'; COMMENT ON COLUMN "quotation"."unit_number" IS 'หมายเลขยูนิต'`);
        await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "unitId"`);
        await queryRunner.query(`ALTER TABLE "package" ADD "project_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "package" ADD "unit_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "package" ADD "is_ctive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`CREATE TYPE "public"."package_item_type_enum" AS ENUM('DEFAULT', 'EQUIVALENT')`);
        await queryRunner.query(`ALTER TABLE "package_item" ADD "type" "public"."package_item_type_enum" NOT NULL DEFAULT 'DEFAULT'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_303cbbaa0114a41cd6654a0af14" FOREIGN KEY ("quotation_id") REFERENCES "quotation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_abe7dd7d5bf735c40b6cf5c4b98" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_a224f30e0a736c561070848d43d" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_a224f30e0a736c561070848d43d"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_abe7dd7d5bf735c40b6cf5c4b98"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_303cbbaa0114a41cd6654a0af14"`);
        await queryRunner.query(`ALTER TABLE "package_item" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."package_item_type_enum"`);
        await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "is_ctive"`);
        await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "unit_id"`);
        await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "project_id"`);
        await queryRunner.query(`ALTER TABLE "package" ADD "unitId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "package" ADD "projectId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "quotation"`);
        await queryRunner.query(`DROP TABLE "quotation_item"`);
    }

}
