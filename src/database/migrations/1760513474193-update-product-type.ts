import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductType1760513474193 implements MigrationInterface {
    name = 'UpdateProductType1760513474193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_type" ADD "code" character varying(10) NOT NULL DEFAULT 'FUR'`);
        await queryRunner.query(`ALTER TABLE "product_type" ADD CONSTRAINT "UQ_69a52b82458769a4d2ab1835b62" UNIQUE ("code")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_type" DROP CONSTRAINT "UQ_69a52b82458769a4d2ab1835b62"`);
        await queryRunner.query(`ALTER TABLE "product_type" DROP COLUMN "code"`);
    }

}
