import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProducts1760435641577 implements MigrationInterface {
    name = 'CreateProducts1760435641577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_option_values" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_option_id" uuid NOT NULL, "value" character varying(100) NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', "image" character varying(255), CONSTRAINT "PK_c5ddd425048b2df1a76cb9d5226" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_options" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_3916b02fb43aa725f8167c718e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_variant_images" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_variant_id" uuid NOT NULL, "file_cur_name" character varying(255), "file_prev_name" character varying(255), "file_extension" character varying(10), "alt_text" character varying(255), "is_main" boolean NOT NULL DEFAULT false, "sort_order" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_6e7e0a1e25b7c5d36609aadc6cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_variants" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid NOT NULL, "sku" character varying(100) NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_46f236f21640f9da218a063a866" UNIQUE ("sku"), CONSTRAINT "PK_281e3f2c55652d6a22c0aa59fd7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" text, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "variant_option_values" ("product_variant_id" uuid NOT NULL, "product_option_value_id" uuid NOT NULL, CONSTRAINT "PK_469ae613f727a69420f7caf2817" PRIMARY KEY ("product_variant_id", "product_option_value_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_05d823f52ff66d4149a5cd784d" ON "variant_option_values" ("product_variant_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0f99ccde035292117268b3fa2a" ON "variant_option_values" ("product_option_value_id") `);
        await queryRunner.query(`ALTER TABLE "product_option_values" ADD CONSTRAINT "FK_bf43668405cdf5fa5598dbc43a6" FOREIGN KEY ("product_option_id") REFERENCES "product_options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_options" ADD CONSTRAINT "FK_49677f87ad61a8b2a31f33c8a2c" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variant_images" ADD CONSTRAINT "FK_f03bbf8faeceddd785593b6cd37" FOREIGN KEY ("product_variant_id") REFERENCES "product_variants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variants" ADD CONSTRAINT "FK_6343513e20e2deab45edfce1316" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variant_option_values" ADD CONSTRAINT "FK_05d823f52ff66d4149a5cd784db" FOREIGN KEY ("product_variant_id") REFERENCES "product_variants"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "variant_option_values" ADD CONSTRAINT "FK_0f99ccde035292117268b3fa2a7" FOREIGN KEY ("product_option_value_id") REFERENCES "product_option_values"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "variant_option_values" DROP CONSTRAINT "FK_0f99ccde035292117268b3fa2a7"`);
        await queryRunner.query(`ALTER TABLE "variant_option_values" DROP CONSTRAINT "FK_05d823f52ff66d4149a5cd784db"`);
        await queryRunner.query(`ALTER TABLE "product_variants" DROP CONSTRAINT "FK_6343513e20e2deab45edfce1316"`);
        await queryRunner.query(`ALTER TABLE "product_variant_images" DROP CONSTRAINT "FK_f03bbf8faeceddd785593b6cd37"`);
        await queryRunner.query(`ALTER TABLE "product_options" DROP CONSTRAINT "FK_49677f87ad61a8b2a31f33c8a2c"`);
        await queryRunner.query(`ALTER TABLE "product_option_values" DROP CONSTRAINT "FK_bf43668405cdf5fa5598dbc43a6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0f99ccde035292117268b3fa2a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_05d823f52ff66d4149a5cd784d"`);
        await queryRunner.query(`DROP TABLE "variant_option_values"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "product_variants"`);
        await queryRunner.query(`DROP TABLE "product_variant_images"`);
        await queryRunner.query(`DROP TABLE "product_options"`);
        await queryRunner.query(`DROP TABLE "product_option_values"`);
    }

}
