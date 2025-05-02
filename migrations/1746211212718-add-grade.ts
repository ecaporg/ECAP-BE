import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGrade1746211212718 implements MigrationInterface {
  name = 'AddGrade1746211212718';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "samples" ADD "grade" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "samples" DROP COLUMN "grade"`);
  }
}
