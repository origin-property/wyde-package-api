import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateQuotation1760697177500 implements MigrationInterface {
    name = 'UpdateQuotation1760697177500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "quotation" ADD "special_code" character varying array`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation"."special_code" IS 'รหัสส่วนลดพิเศษ'`);
        await queryRunner.query(`ALTER TABLE "quotation" ADD "special_discount" numeric(18,2)`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation"."special_discount" IS 'ส่วนลดพิเศษ'`);
        await queryRunner.query(`ALTER TABLE "quotation" ADD "vocher_code" character varying array`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation"."vocher_code" IS 'รหัสส่วนลดพิเศษ'`);
        await queryRunner.query(`ALTER TABLE "quotation" ADD "vocher_discount" numeric(18,2)`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation"."vocher_discount" IS 'ส่วนลดพิเศษ'`);
        await queryRunner.query(`ALTER TABLE "package_detail" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "package_detail" ADD "projectId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "package_detail" DROP COLUMN "modelId"`);
        await queryRunner.query(`ALTER TABLE "package_detail" ADD "modelId" uuid NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package_detail" DROP COLUMN "modelId"`);
        await queryRunner.query(`ALTER TABLE "package_detail" ADD "modelId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "package_detail" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "package_detail" ADD "projectId" character varying NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation"."vocher_discount" IS 'ส่วนลดพิเศษ'`);
        await queryRunner.query(`ALTER TABLE "quotation" DROP COLUMN "vocher_discount"`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation"."vocher_code" IS 'รหัสส่วนลดพิเศษ'`);
        await queryRunner.query(`ALTER TABLE "quotation" DROP COLUMN "vocher_code"`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation"."special_discount" IS 'ส่วนลดพิเศษ'`);
        await queryRunner.query(`ALTER TABLE "quotation" DROP COLUMN "special_discount"`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation"."special_code" IS 'รหัสส่วนลดพิเศษ'`);
        await queryRunner.query(`ALTER TABLE "quotation" DROP COLUMN "special_code"`);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "product" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

}
