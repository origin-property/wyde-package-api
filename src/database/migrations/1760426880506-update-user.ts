import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1760426880506 implements MigrationInterface {
    name = 'UpdateUser1760426880506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "securityCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "securityCount"`);
    }

}
