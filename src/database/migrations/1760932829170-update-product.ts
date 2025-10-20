import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProduct1760932829170 implements MigrationInterface {
    name = 'UpdateProduct1760932829170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9c47355777d0ea7c76aa31059cd"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "product_type_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "product_type_id" uuid`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9c47355777d0ea7c76aa31059cd" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
