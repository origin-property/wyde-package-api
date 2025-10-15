import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductType1760508055532 implements MigrationInterface {
    name = 'CreateProductType1760508055532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_type" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" text, CONSTRAINT "UQ_8978484a9cee7a0c780cd259b88" UNIQUE ("name"), CONSTRAINT "PK_e0843930fbb8854fe36ca39dae1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD "product_type_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9c47355777d0ea7c76aa31059cd" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9c47355777d0ea7c76aa31059cd"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "product_type_id"`);
        await queryRunner.query(`DROP TABLE "product_type"`);
    }

}
