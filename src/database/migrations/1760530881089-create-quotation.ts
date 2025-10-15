import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQuotation1760530881089 implements MigrationInterface {
    name = 'CreateQuotation1760530881089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quotation" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" character varying NOT NULL DEFAULT uuidv7(), "date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "code" character varying NOT NULL, "customer_first_name" character varying, "customer_last_name" character varying, "customer_phone" character varying, "customer_email" character varying, "customer_address" text, CONSTRAINT "UQ_4c3973c666b05afaf4ff9d140be" UNIQUE ("code"), CONSTRAINT "PK_596c572d5858492d10d8cf5383d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "quotation"`);
    }

}
