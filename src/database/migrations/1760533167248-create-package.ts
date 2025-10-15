import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePackage1760533167248 implements MigrationInterface {
    name = 'CreatePackage1760533167248'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "package" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" text, "project_id" character varying NOT NULL, "unit_id" character varying NOT NULL, "is_ctive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_308364c66df656295bc4ec467c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."package_item_type_enum" AS ENUM('DEFAULT', 'EQUIVALENT')`);
        await queryRunner.query(`CREATE TABLE "package_item" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_variant_id" uuid NOT NULL, "package_id" uuid NOT NULL, "quantity" integer NOT NULL, "special_price" integer NOT NULL, "type" "public"."package_item_type_enum" NOT NULL DEFAULT 'DEFAULT', CONSTRAINT "PK_b9830060b4e555fe0e1bd97b577" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "package_item" ADD CONSTRAINT "FK_1757006eced906119315086de61" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package_item" ADD CONSTRAINT "FK_aaa813142d5429c23f357d98de7" FOREIGN KEY ("package_id") REFERENCES "package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package_item" DROP CONSTRAINT "FK_aaa813142d5429c23f357d98de7"`);
        await queryRunner.query(`ALTER TABLE "package_item" DROP CONSTRAINT "FK_1757006eced906119315086de61"`);
        await queryRunner.query(`DROP TABLE "package_item"`);
        await queryRunner.query(`DROP TYPE "public"."package_item_type_enum"`);
        await queryRunner.query(`DROP TABLE "package"`);
    }

}
