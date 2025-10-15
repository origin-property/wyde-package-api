import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategory1760511630003 implements MigrationInterface {
    name = 'CreateCategory1760511630003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_type_id" uuid NOT NULL, "name" character varying(255) NOT NULL, "description" text, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD "category_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_a6d080a3ec51e88a38f9be4e6f3" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_a6d080a3ec51e88a38f9be4e6f3"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "category_id"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
