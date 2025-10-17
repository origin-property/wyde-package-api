import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProduct1760689162236 implements MigrationInterface {
    name = 'UpdateProduct1760689162236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package_item" DROP CONSTRAINT "FK_aaa813142d5429c23f357d98de7"`);
        await queryRunner.query(`ALTER TABLE "package_item" RENAME COLUMN "package_id" TO "product_id"`);
        await queryRunner.query(`CREATE TABLE "package_detail" ("product_id" uuid NOT NULL, "projectId" uuid NOT NULL, "modelId" uuid NOT NULL, CONSTRAINT "PK_ef0b311e54e5f14c64099bd6fee" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."product_item_type_enum" AS ENUM('PRODUCT', 'PACKAGE')`);
        await queryRunner.query(`ALTER TABLE "product" ADD "item_type" "public"."product_item_type_enum" NOT NULL DEFAULT 'PRODUCT'`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9c47355777d0ea7c76aa31059cd"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1"`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "product_type_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "category_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9c47355777d0ea7c76aa31059cd" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package_item" ADD CONSTRAINT "FK_8ecebd98573b36ad2bc47121bdc" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package_item" DROP CONSTRAINT "FK_8ecebd98573b36ad2bc47121bdc"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9c47355777d0ea7c76aa31059cd"`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "category_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "product_type_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9c47355777d0ea7c76aa31059cd" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "item_type"`);
        await queryRunner.query(`DROP TYPE "public"."product_item_type_enum"`);
        await queryRunner.query(`DROP TABLE "package_detail"`);
        await queryRunner.query(`ALTER TABLE "package_item" RENAME COLUMN "product_id" TO "package_id"`);
        await queryRunner.query(`ALTER TABLE "package_item" ADD CONSTRAINT "FK_aaa813142d5429c23f357d98de7" FOREIGN KEY ("package_id") REFERENCES "package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
