import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductVariantAndProduct1760693472952 implements MigrationInterface {
    name = 'UpdateProductVariantAndProduct1760693472952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "isActive"`);
    }

}
