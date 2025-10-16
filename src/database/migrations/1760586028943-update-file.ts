import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFile1760586028943 implements MigrationInterface {
    name = 'UpdateFile1760586028943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" ADD "project_id" character varying(15)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "project_id"`);
    }

}
