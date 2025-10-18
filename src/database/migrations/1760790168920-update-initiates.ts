import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateInitiates1760790168920 implements MigrationInterface {
    name = 'UpdateInitiates1760790168920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_b23c65e50a758245a33ee35fda1"`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "id" SET DEFAULT uuidv7()`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_87b8888186ca9769c960e926870"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT uuidv7()`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_a6d080a3ec51e88a38f9be4e6f3"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9c47355777d0ea7c76aa31059cd"`);
        await queryRunner.query(`ALTER TABLE "product_type" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product_type" ALTER COLUMN "id" SET DEFAULT uuidv7()`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1"`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "id" SET DEFAULT uuidv7()`);
        await queryRunner.query(`ALTER TABLE "variant_option_values" DROP CONSTRAINT "FK_0f99ccde035292117268b3fa2a7"`);
        await queryRunner.query(`ALTER TABLE "product_option_value" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product_option_value" ALTER COLUMN "id" SET DEFAULT uuidv7()`);
        await queryRunner.query(`ALTER TABLE "product_option_value" DROP CONSTRAINT "FK_975b6e2a1b5de96875fa1c84413"`);
        await queryRunner.query(`ALTER TABLE "product_option" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product_option" ALTER COLUMN "id" SET DEFAULT uuidv7()`);
        await queryRunner.query(`ALTER TABLE "package_item" DROP CONSTRAINT "FK_8ecebd98573b36ad2bc47121bdc"`);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP CONSTRAINT "FK_ca67dd080aac5ecf99609960cd2"`);
        await queryRunner.query(`ALTER TABLE "product_option" DROP CONSTRAINT "FK_e634fca34f6b594b87fdbee95f6"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_a224f30e0a736c561070848d43d"`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "id" SET DEFAULT uuidv7()`);
        await queryRunner.query(`ALTER TABLE "package_item" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "package_item" ALTER COLUMN "id" SET DEFAULT uuidv7()`);
        await queryRunner.query(`ALTER TABLE "product_variant_image" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product_variant_image" ALTER COLUMN "id" SET DEFAULT uuidv7()`);
        await queryRunner.query(`ALTER TABLE "package_item" DROP CONSTRAINT "FK_1757006eced906119315086de61"`);
        await queryRunner.query(`ALTER TABLE "product_variant_image" DROP CONSTRAINT "FK_69000ecf433a3a1f776b73fd187"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_abe7dd7d5bf735c40b6cf5c4b98"`);
        await queryRunner.query(`ALTER TABLE "variant_option_values" DROP CONSTRAINT "FK_05d823f52ff66d4149a5cd784db"`);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "id" SET DEFAULT uuidv7()`);
        await queryRunner.query(`ALTER TABLE "file" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "file" ALTER COLUMN "id" SET DEFAULT uuidv7()`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_a6d080a3ec51e88a38f9be4e6f3" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_option_value" ADD CONSTRAINT "FK_975b6e2a1b5de96875fa1c84413" FOREIGN KEY ("product_option_id") REFERENCES "product_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_option" ADD CONSTRAINT "FK_e634fca34f6b594b87fdbee95f6" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9c47355777d0ea7c76aa31059cd" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package_item" ADD CONSTRAINT "FK_8ecebd98573b36ad2bc47121bdc" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package_item" ADD CONSTRAINT "FK_1757006eced906119315086de61" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variant_image" ADD CONSTRAINT "FK_69000ecf433a3a1f776b73fd187" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD CONSTRAINT "FK_ca67dd080aac5ecf99609960cd2" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_a224f30e0a736c561070848d43d" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_abe7dd7d5bf735c40b6cf5c4b98" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variant_option_values" ADD CONSTRAINT "FK_05d823f52ff66d4149a5cd784db" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "variant_option_values" ADD CONSTRAINT "FK_0f99ccde035292117268b3fa2a7" FOREIGN KEY ("product_option_value_id") REFERENCES "product_option_value"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "variant_option_values" DROP CONSTRAINT "FK_0f99ccde035292117268b3fa2a7"`);
        await queryRunner.query(`ALTER TABLE "variant_option_values" DROP CONSTRAINT "FK_05d823f52ff66d4149a5cd784db"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_b23c65e50a758245a33ee35fda1"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_87b8888186ca9769c960e926870"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_abe7dd7d5bf735c40b6cf5c4b98"`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_a224f30e0a736c561070848d43d"`);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP CONSTRAINT "FK_ca67dd080aac5ecf99609960cd2"`);
        await queryRunner.query(`ALTER TABLE "product_variant_image" DROP CONSTRAINT "FK_69000ecf433a3a1f776b73fd187"`);
        await queryRunner.query(`ALTER TABLE "package_item" DROP CONSTRAINT "FK_1757006eced906119315086de61"`);
        await queryRunner.query(`ALTER TABLE "package_item" DROP CONSTRAINT "FK_8ecebd98573b36ad2bc47121bdc"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9c47355777d0ea7c76aa31059cd"`);
        await queryRunner.query(`ALTER TABLE "product_option" DROP CONSTRAINT "FK_e634fca34f6b594b87fdbee95f6"`);
        await queryRunner.query(`ALTER TABLE "product_option_value" DROP CONSTRAINT "FK_975b6e2a1b5de96875fa1c84413"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_a6d080a3ec51e88a38f9be4e6f3"`);
        await queryRunner.query(`ALTER TABLE "file" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "file" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "variant_option_values" ADD CONSTRAINT "FK_05d823f52ff66d4149a5cd784db" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_abe7dd7d5bf735c40b6cf5c4b98" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variant_image" ADD CONSTRAINT "FK_69000ecf433a3a1f776b73fd187" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package_item" ADD CONSTRAINT "FK_1757006eced906119315086de61" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variant_image" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product_variant_image" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "package_item" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "package_item" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_a224f30e0a736c561070848d43d" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_option" ADD CONSTRAINT "FK_e634fca34f6b594b87fdbee95f6" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD CONSTRAINT "FK_ca67dd080aac5ecf99609960cd2" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package_item" ADD CONSTRAINT "FK_8ecebd98573b36ad2bc47121bdc" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_option" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product_option" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "product_option_value" ADD CONSTRAINT "FK_975b6e2a1b5de96875fa1c84413" FOREIGN KEY ("product_option_id") REFERENCES "product_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_option_value" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product_option_value" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "variant_option_values" ADD CONSTRAINT "FK_0f99ccde035292117268b3fa2a7" FOREIGN KEY ("product_option_value_id") REFERENCES "product_option_value"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_type" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product_type" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9c47355777d0ea7c76aa31059cd" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_a6d080a3ec51e88a38f9be4e6f3" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
