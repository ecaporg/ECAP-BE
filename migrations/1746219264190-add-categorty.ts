import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCategorty1746219264190 implements MigrationInterface {
  name = 'AddCategorty1746219264190';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."samples_flag_category_enum" AS ENUM('MISSING_SAMPLE', 'REASON_REJECTED', 'ERROR_IN_SAMPLE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "samples" ADD "flag_category" "public"."samples_flag_category_enum"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "samples" DROP COLUMN "flag_category"`,
    );
    await queryRunner.query(`DROP TYPE "public"."samples_flag_category_enum"`);
  }
}
