import { MigrationInterface, QueryRunner } from 'typeorm';

export class SampleFlags1745525307522 implements MigrationInterface {
  name = 'SampleFlags1745525307522';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sample_flag_errors" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" integer NOT NULL, "user_id" integer NOT NULL, "comment" character varying NOT NULL, CONSTRAINT "PK_0caf047533b0399cd4bc26b980b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sample_flag_missing_work" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" integer NOT NULL, "user_id" integer NOT NULL, "reason" character varying NOT NULL, CONSTRAINT "PK_eb8da7bc81401e6e05c305af349" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_errors" ADD CONSTRAINT "FK_9ec6f8cee254cf0dde54cc21c93" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_errors" ADD CONSTRAINT "FK_0caf047533b0399cd4bc26b980b" FOREIGN KEY ("id") REFERENCES "samples"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_missing_work" ADD CONSTRAINT "FK_ae51d1004dce2cc6e9bcc8e3ed2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_missing_work" ADD CONSTRAINT "FK_eb8da7bc81401e6e05c305af349" FOREIGN KEY ("id") REFERENCES "samples"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sample_flag_missing_work" DROP CONSTRAINT "FK_eb8da7bc81401e6e05c305af349"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_missing_work" DROP CONSTRAINT "FK_ae51d1004dce2cc6e9bcc8e3ed2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_errors" DROP CONSTRAINT "FK_0caf047533b0399cd4bc26b980b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_errors" DROP CONSTRAINT "FK_9ec6f8cee254cf0dde54cc21c93"`,
    );
    await queryRunner.query(`DROP TABLE "sample_flag_missing_work"`);
    await queryRunner.query(`DROP TABLE "sample_flag_errors"`);
  }
}
