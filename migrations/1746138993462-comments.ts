import { MigrationInterface, QueryRunner } from 'typeorm';

export class Comments1746138993462 implements MigrationInterface {
  name = 'Comments1746138993462';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sample_flag_rejected" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" integer NOT NULL, "user_id" integer, "reason" character varying NOT NULL, CONSTRAINT "PK_961bf01c879380765f2bb29c086" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_rejected" ADD CONSTRAINT "FK_b9bea24f0f61a9d4a9631bfa443" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_rejected" ADD CONSTRAINT "FK_961bf01c879380765f2bb29c086" FOREIGN KEY ("id") REFERENCES "samples"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sample_flag_rejected" DROP CONSTRAINT "FK_961bf01c879380765f2bb29c086"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_rejected" DROP CONSTRAINT "FK_b9bea24f0f61a9d4a9631bfa443"`,
    );
    await queryRunner.query(`DROP TABLE "sample_flag_rejected"`);
  }
}
