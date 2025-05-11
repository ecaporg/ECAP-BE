import { MigrationInterface, QueryRunner } from 'typeorm';

export class Cascade1746992196670 implements MigrationInterface {
  name = 'Cascade1746992196670';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "track_calendar" DROP CONSTRAINT "FK_b2f2a7e02e6192f4ada71624864"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "track_calendar_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "track_calendar" ADD CONSTRAINT "FK_b2f2a7e02e6192f4ada71624864" FOREIGN KEY ("id") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "track_calendar" DROP CONSTRAINT "FK_b2f2a7e02e6192f4ada71624864"`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "track_calendar_id_seq" OWNED BY "track_calendar"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" ALTER COLUMN "id" SET DEFAULT nextval('"track_calendar_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" ADD CONSTRAINT "FK_b2f2a7e02e6192f4ada71624864" FOREIGN KEY ("id") REFERENCES "tracks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
