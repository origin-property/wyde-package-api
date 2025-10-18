import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateQuotationItem1760792066591 implements MigrationInterface {
    name = 'UpdateQuotationItem1760792066591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD "package_item_id" uuid`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."package_item_id" IS 'รหัสแพ๊คเกจ'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" ADD CONSTRAINT "FK_9ba05c4bc3ee8285dcc8395a55d" FOREIGN KEY ("package_item_id") REFERENCES "package_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP CONSTRAINT "FK_9ba05c4bc3ee8285dcc8395a55d"`);
        await queryRunner.query(`COMMENT ON COLUMN "quotation_item"."package_item_id" IS 'รหัสแพ๊คเกจ'`);
        await queryRunner.query(`ALTER TABLE "quotation_item" DROP COLUMN "package_item_id"`);
    }

}
