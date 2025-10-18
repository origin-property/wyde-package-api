import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePromotion1760795540790 implements MigrationInterface {
    name = 'CreatePromotion1760795540790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."promotion_kind_enum" AS ENUM('discount', 'voucher')`);
        await queryRunner.query(`CREATE TYPE "public"."promotion_type_enum" AS ENUM('percentage', 'fixed_amount')`);
        await queryRunner.query(`CREATE TABLE "promotion" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuidv7(), "kind" "public"."promotion_kind_enum" NOT NULL DEFAULT 'discount', "code" character varying(50) NOT NULL, "name" character varying(255) NOT NULL, "description" text, "type" "public"."promotion_type_enum" NOT NULL DEFAULT 'fixed_amount', "value" numeric(10,2) NOT NULL DEFAULT '0', "start_at" TIMESTAMP WITH TIME ZONE NOT NULL, "end_at" TIMESTAMP WITH TIME ZONE, "is_active" boolean NOT NULL DEFAULT true, "usage_limit" integer, "used_count" integer NOT NULL DEFAULT '0', "per_user_limit" integer, "min_order_total" numeric(10,2), "max_discount_amount" numeric(10,2), CONSTRAINT "UQ_969359329a22440d2b8f7d491d4" UNIQUE ("code"), CONSTRAINT "PK_fab3630e0789a2002f1cadb7d38" PRIMARY KEY ("id")); COMMENT ON COLUMN "promotion"."kind" IS 'ประเภทโปรโมชั่น: discount หรือ voucher'; COMMENT ON COLUMN "promotion"."code" IS 'รหัสโค้ด เช่น WY001, Discount100'; COMMENT ON COLUMN "promotion"."value" IS 'ค่าลด เช่น 10% หรือ 100 บาท'; COMMENT ON COLUMN "promotion"."usage_limit" IS 'จำกัดจำนวนครั้งรวมทั้งหมด'; COMMENT ON COLUMN "promotion"."per_user_limit" IS 'จำกัดการใช้งานต่อผู้ใช้'; COMMENT ON COLUMN "promotion"."min_order_total" IS 'ยอดสั่งซื้อขั้นต่ำ'; COMMENT ON COLUMN "promotion"."max_discount_amount" IS 'ส่วนลดสูงสุด (สำหรับ percentage)'`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_969359329a22440d2b8f7d491d" ON "promotion" ("code") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_969359329a22440d2b8f7d491d"`);
        await queryRunner.query(`DROP TABLE "promotion"`);
        await queryRunner.query(`DROP TYPE "public"."promotion_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."promotion_kind_enum"`);
    }

}
