import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsAndFile1760505282965 implements MigrationInterface {
    name = 'CreateProductsAndFile1760505282965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_option_value" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_option_id" uuid NOT NULL, "value" character varying(100) NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', "image" character varying(255), CONSTRAINT "PK_2ab71ed3b21be5800905c621535" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_option" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_4cf3c467e9bc764bdd32c4cd938" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_variant_image" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_variant_id" uuid NOT NULL, "file_cur_name" character varying(255), "file_prev_name" character varying(255), "file_extension" character varying(10), "alt_text" character varying(255), "is_main" boolean NOT NULL DEFAULT false, "sort_order" integer NOT NULL DEFAULT '0', "file_path" character varying NOT NULL, "file_bucket" character varying NOT NULL, CONSTRAINT "PK_e768b1a1fe30fe0aa9cc54b1a83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_variant" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid NOT NULL, "sku" character varying(100) NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_f4dc2c0888b66d547c175f090e2" UNIQUE ("sku"), CONSTRAINT "PK_1ab69c9935c61f7c70791ae0a9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" text, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ref_id" uuid NOT NULL, "file_name" character varying NOT NULL, "file_path" character varying NOT NULL, "file_bucket" character varying NOT NULL, "is_public" boolean NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c839fa149d39efa6217eee7414" ON "file" ("ref_id") `);
        await queryRunner.query(`CREATE TABLE "variant_option_values" ("product_variant_id" uuid NOT NULL, "product_option_value_id" uuid NOT NULL, CONSTRAINT "PK_469ae613f727a69420f7caf2817" PRIMARY KEY ("product_variant_id", "product_option_value_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_05d823f52ff66d4149a5cd784d" ON "variant_option_values" ("product_variant_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0f99ccde035292117268b3fa2a" ON "variant_option_values" ("product_option_value_id") `);
        await queryRunner.query(`ALTER TABLE "product_option_value" ADD CONSTRAINT "FK_975b6e2a1b5de96875fa1c84413" FOREIGN KEY ("product_option_id") REFERENCES "product_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_option" ADD CONSTRAINT "FK_e634fca34f6b594b87fdbee95f6" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variant_image" ADD CONSTRAINT "FK_69000ecf433a3a1f776b73fd187" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD CONSTRAINT "FK_ca67dd080aac5ecf99609960cd2" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variant_option_values" ADD CONSTRAINT "FK_05d823f52ff66d4149a5cd784db" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "variant_option_values" ADD CONSTRAINT "FK_0f99ccde035292117268b3fa2a7" FOREIGN KEY ("product_option_value_id") REFERENCES "product_option_value"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "variant_option_values" DROP CONSTRAINT "FK_0f99ccde035292117268b3fa2a7"`);
        await queryRunner.query(`ALTER TABLE "variant_option_values" DROP CONSTRAINT "FK_05d823f52ff66d4149a5cd784db"`);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP CONSTRAINT "FK_ca67dd080aac5ecf99609960cd2"`);
        await queryRunner.query(`ALTER TABLE "product_variant_image" DROP CONSTRAINT "FK_69000ecf433a3a1f776b73fd187"`);
        await queryRunner.query(`ALTER TABLE "product_option" DROP CONSTRAINT "FK_e634fca34f6b594b87fdbee95f6"`);
        await queryRunner.query(`ALTER TABLE "product_option_value" DROP CONSTRAINT "FK_975b6e2a1b5de96875fa1c84413"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0f99ccde035292117268b3fa2a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_05d823f52ff66d4149a5cd784d"`);
        await queryRunner.query(`DROP TABLE "variant_option_values"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c839fa149d39efa6217eee7414"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "product_variant"`);
        await queryRunner.query(`DROP TABLE "product_variant_image"`);
        await queryRunner.query(`DROP TABLE "product_option"`);
        await queryRunner.query(`DROP TABLE "product_option_value"`);
    }

}
