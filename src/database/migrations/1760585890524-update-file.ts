import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFile1760585890524 implements MigrationInterface {
    name = 'UpdateFile1760585890524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "sellingPrice" DROP DEFAULT`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c839fa149d39efa6217eee7414"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "ref_id"`);
        await queryRunner.query(`ALTER TABLE "file" ADD "ref_id" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_c839fa149d39efa6217eee7414" ON "file" ("ref_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_c839fa149d39efa6217eee7414"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "ref_id"`);
        await queryRunner.query(`ALTER TABLE "file" ADD "ref_id" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_c839fa149d39efa6217eee7414" ON "file" ("ref_id") `);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "sellingPrice" SET DEFAULT '0'`);
    }

}
