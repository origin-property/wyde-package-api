import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFile1760438165082 implements MigrationInterface {
    name = 'CreateFile1760438165082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ref_id" uuid NOT NULL, "file_id" character varying NOT NULL, "file_type" character varying NOT NULL, "file_name" character varying NOT NULL, "file_folder" character varying NOT NULL, "file_path" character varying NOT NULL, "file_bucket" character varying NOT NULL, "file_extension" character varying NOT NULL, "is_public" boolean NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c839fa149d39efa6217eee7414" ON "file" ("ref_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_c839fa149d39efa6217eee7414"`);
        await queryRunner.query(`DROP TABLE "file"`);
    }

}
