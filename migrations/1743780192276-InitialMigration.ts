import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1743780192276 implements MigrationInterface {
  name = 'InitialMigration1743780192276';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "user" integer NOT NULL, "role" integer NOT NULL, CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ae54bfa78ffecc8cbed4555bd2" ON "user_role" ("user") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_30ddd91a212a9d03669bc1dee7" ON "user_role" ("role") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_2d3b7773f160e10a4530dfabd8" ON "user_role" ("user", "role") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "emailVerified" boolean NOT NULL DEFAULT false, "refreshToken" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_409a0298fdd86a6495e23c25c6" ON "users" ("isActive") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_19f0320dbf4e94fabff881c0be" ON "users" ("emailVerified") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_ae54bfa78ffecc8cbed4555bd21" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_30ddd91a212a9d03669bc1dee74" FOREIGN KEY ("role") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_30ddd91a212a9d03669bc1dee74"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_ae54bfa78ffecc8cbed4555bd21"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_19f0320dbf4e94fabff881c0be"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_409a0298fdd86a6495e23c25c6"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2d3b7773f160e10a4530dfabd8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_30ddd91a212a9d03669bc1dee7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ae54bfa78ffecc8cbed4555bd2"`,
    );
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}


