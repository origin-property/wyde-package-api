import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateQuotationPromotion1760854717804 implements MigrationInterface {
    name = 'UpdateQuotationPromotion1760854717804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."quotation_promotion_kind_enum" AS ENUM('DISCOUNT', 'VOUCHER')`);
        await queryRunner.query(`CREATE TYPE "public"."quotation_promotion_type_enum" AS ENUM('PERCENTAGE', 'FIXED_AMOUNT')`);
        await queryRunner.query(`CREATE TABLE "quotation_promotion" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuidv7(), "quotation_id" uuid NOT NULL, "promotion_id" uuid NOT NULL, "kind" "public"."quotation_promotion_kind_enum" NOT NULL DEFAULT 'DISCOUNT', "code" character varying(50), "name" character varying(255) NOT NULL, "description" text, "type" "public"."quotation_promotion_type_enum" NOT NULL DEFAULT 'FIXED_AMOUNT', "value" numeric(10,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_4b1d75bb0e7cba9fd82ab5e1dfc" PRIMARY KEY ("id")); COMMENT ON COLUMN "quotation_promotion"."quotation_id" IS 'รหัสใบเสนอราคา'; COMMENT ON COLUMN "quotation_promotion"."promotion_id" IS 'รหัสโปรโมชั่น'; COMMENT ON COLUMN "quotation_promotion"."kind" IS 'ประเภทโปรโมชั่น: discount หรือ voucher'; COMMENT ON COLUMN "quotation_promotion"."code" IS 'รหัสโค้ด เช่น WY001, Discount100'; COMMENT ON COLUMN "quotation_promotion"."value" IS 'ค่าลด เช่น 10% หรือ 100 บาท'`);
        await queryRunner.query(`ALTER TABLE "quotation_promotion" ADD CONSTRAINT "FK_609bf358c550f19943afe2c22f8" FOREIGN KEY ("quotation_id") REFERENCES "quotation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quotation_promotion" ADD CONSTRAINT "FK_5510d13e0f1dba52bbbefb37b06" FOREIGN KEY ("promotion_id") REFERENCES "promotion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotation_promotion" DROP CONSTRAINT "FK_5510d13e0f1dba52bbbefb37b06"`);
        await queryRunner.query(`ALTER TABLE "quotation_promotion" DROP CONSTRAINT "FK_609bf358c550f19943afe2c22f8"`);
        await queryRunner.query(`DROP TABLE "quotation_promotion"`);
        await queryRunner.query(`DROP TYPE "public"."quotation_promotion_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."quotation_promotion_kind_enum"`);
    }

}
