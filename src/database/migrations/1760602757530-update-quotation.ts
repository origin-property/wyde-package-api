import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateQuotation1760602757530 implements MigrationInterface {
    name = 'UpdateQuotation1760602757530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."quotation_status_enum" AS ENUM('PENDING', 'PAID', 'CANCELLED')`);
        await queryRunner.query(`ALTER TABLE "quotation" ADD "status" "public"."quotation_status_enum" NOT NULL DEFAULT 'PENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotation" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."quotation_status_enum"`);
    }

}
