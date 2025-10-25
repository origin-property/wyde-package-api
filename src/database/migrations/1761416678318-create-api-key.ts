import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateApiKey1761416678318 implements MigrationInterface {
    name = 'CreateApiKey1761416678318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "api_key" ("id" uuid NOT NULL DEFAULT uuidv7(), "api_key" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "is_active" boolean NOT NULL DEFAULT true, "last_used_at" TIMESTAMP WITH TIME ZONE, "usage_count" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_b1bd840641b8acbaad89c3d8d11" PRIMARY KEY ("id")); COMMENT ON COLUMN "api_key"."usage_count" IS 'จำนวนการใช้งาน'`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e19efac96a8fc087cf9eea608b" ON "api_key" ("api_key") `);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "specialPrice"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "specialPrice" numeric(10,2)`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e19efac96a8fc087cf9eea608b"`);
        await queryRunner.query(`DROP TABLE "api_key"`);
    }

}
