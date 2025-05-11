import { MigrationInterface, QueryRunner } from 'typeorm';

export class CalendarToJson1746989695860 implements MigrationInterface {
  name = 'CalendarToJson1746989695860';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "track_calendar" DROP CONSTRAINT "FK_ef80f9d2bf9ed48581fd5f37a05"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" DROP CONSTRAINT "PK_7430e29eabbb95e8bde0285ed40"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" ADD CONSTRAINT "PK_113db1d6a75ead2e45774288d64" PRIMARY KEY ("date")`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" DROP COLUMN "track_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" DROP CONSTRAINT "PK_113db1d6a75ead2e45774288d64"`,
    );
    await queryRunner.query(`ALTER TABLE "track_calendar" DROP COLUMN "date"`);
    await queryRunner.query(`ALTER TABLE "track_calendar" DROP COLUMN "type"`);
    await queryRunner.query(
      `ALTER TABLE "track_calendar" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" ADD CONSTRAINT "PK_b2f2a7e02e6192f4ada71624864" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" ADD "days" json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" ADD CONSTRAINT "FK_b2f2a7e02e6192f4ada71624864" FOREIGN KEY ("id") REFERENCES "tracks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW "teacher_compliance_view"`);
    await queryRunner.query(
      `ALTER TABLE "track_calendar" DROP CONSTRAINT "FK_b2f2a7e02e6192f4ada71624864"`,
    );
    await queryRunner.query(`ALTER TABLE "track_calendar" DROP COLUMN "days"`);
    await queryRunner.query(
      `ALTER TABLE "track_calendar" DROP CONSTRAINT "PK_b2f2a7e02e6192f4ada71624864"`,
    );
    await queryRunner.query(`ALTER TABLE "track_calendar" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "track_calendar" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" ADD "type" character varying(250) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" ADD "date" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" ADD CONSTRAINT "PK_113db1d6a75ead2e45774288d64" PRIMARY KEY ("date")`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" ADD "track_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" DROP CONSTRAINT "PK_113db1d6a75ead2e45774288d64"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" ADD CONSTRAINT "PK_7430e29eabbb95e8bde0285ed40" PRIMARY KEY ("track_id", "date")`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" ADD CONSTRAINT "FK_ef80f9d2bf9ed48581fd5f37a05" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
