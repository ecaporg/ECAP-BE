import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewDb1744131726713 implements MigrationInterface {
  name = 'NewDb1744131726713';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "email" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "emailVerified" boolean NOT NULL DEFAULT false, "refreshToken" character varying, "role" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_409a0298fdd86a6495e23c25c6" ON "users" ("isActive") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_19f0320dbf4e94fabff881c0be" ON "users" ("emailVerified") `,
    );
    await queryRunner.query(
      `CREATE TABLE "students" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "school_id" integer NOT NULL, "user_id" integer NOT NULL, "academy" character varying(50) NOT NULL, "grade" character varying(50) NOT NULL, CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_aa8edc7905ad764f8592456964" ON "students" ("school_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fb3eff90b11bddf7285f9b4e28" ON "students" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "directors" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "school_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "REL_a49091e4f464b19d5428d21fc1" UNIQUE ("user_id"), CONSTRAINT "PK_8d50ccf56fac0296d645f94d10c" PRIMARY KEY ("school_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "semesters" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "school_id" integer NOT NULL, "name" character varying(50) NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_25c393e2e76b3e32e87a79b1dc2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subjects" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "track_id" integer NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "track_calendar" ("track_id" integer NOT NULL, "date" TIMESTAMP NOT NULL, "type" character varying(50) NOT NULL, CONSTRAINT "PK_7430e29eabbb95e8bde0285ed40" PRIMARY KEY ("track_id", "date"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "track_learning_periods" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "track_id" integer NOT NULL, "name" character varying(50) NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_d829f156a60ce0e53880b5ff78a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tracks" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "school_id" integer NOT NULL, "name" character varying(50) NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "schools" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_95b932e47ac129dd8e23a0db548" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "teachers" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "school_id" integer NOT NULL, CONSTRAINT "PK_730cd48fc71dae81a30f46337dd" PRIMARY KEY ("user_id", "school_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4668d4752e6766682d1be0b346" ON "teachers" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5656d1b6d40765ea6b135b35d4" ON "teachers" ("school_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "admins" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "school_id" integer NOT NULL, CONSTRAINT "PK_767cea348aa59fd3fe6fda0efc3" PRIMARY KEY ("user_id", "school_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2b901dd818a2a6486994d915a6" ON "admins" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_665e266ea55164abec89a0d898" ON "admins" ("school_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "samples" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "student_id" integer NOT NULL, "subject_id" integer NOT NULL, "teacher_id" integer NOT NULL, "assignment_title" character varying(50) NOT NULL, "status" character varying(50) NOT NULL, CONSTRAINT "PK_d68b5b3bd25a6851b033fb63444" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_aa8edc7905ad764f85924569647" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "directors" ADD CONSTRAINT "FK_a49091e4f464b19d5428d21fc1f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "directors" ADD CONSTRAINT "FK_8d50ccf56fac0296d645f94d10c" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "semesters" ADD CONSTRAINT "FK_1b8332191b3f466631afae40d98" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" ADD CONSTRAINT "FK_8e3d2ec54e67991ef78c7c1c7ac" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" ADD CONSTRAINT "FK_ef80f9d2bf9ed48581fd5f37a05" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_learning_periods" ADD CONSTRAINT "FK_21cce0b7c46b5687e745d07b838" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_882e239f6d3604bbac39d78a4c2" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD CONSTRAINT "FK_4668d4752e6766682d1be0b346f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD CONSTRAINT "FK_5656d1b6d40765ea6b135b35d4b" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "admins" ADD CONSTRAINT "FK_2b901dd818a2a6486994d915a68" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "admins" ADD CONSTRAINT "FK_665e266ea55164abec89a0d8980" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "samples" ADD CONSTRAINT "FK_add2bb542f77b56f991c9792149" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "samples" ADD CONSTRAINT "FK_cb96080f78bd231658473bac12f" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "samples" ADD CONSTRAINT "FK_9cb00668c5987fa5fe9fd599ef0" FOREIGN KEY ("teacher_id", "teacher_id") REFERENCES "teachers"("user_id","school_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "samples" DROP CONSTRAINT "FK_9cb00668c5987fa5fe9fd599ef0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "samples" DROP CONSTRAINT "FK_cb96080f78bd231658473bac12f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "samples" DROP CONSTRAINT "FK_add2bb542f77b56f991c9792149"`,
    );
    await queryRunner.query(
      `ALTER TABLE "admins" DROP CONSTRAINT "FK_665e266ea55164abec89a0d8980"`,
    );
    await queryRunner.query(
      `ALTER TABLE "admins" DROP CONSTRAINT "FK_2b901dd818a2a6486994d915a68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" DROP CONSTRAINT "FK_5656d1b6d40765ea6b135b35d4b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" DROP CONSTRAINT "FK_4668d4752e6766682d1be0b346f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_882e239f6d3604bbac39d78a4c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_learning_periods" DROP CONSTRAINT "FK_21cce0b7c46b5687e745d07b838"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" DROP CONSTRAINT "FK_ef80f9d2bf9ed48581fd5f37a05"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" DROP CONSTRAINT "FK_8e3d2ec54e67991ef78c7c1c7ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "semesters" DROP CONSTRAINT "FK_1b8332191b3f466631afae40d98"`,
    );
    await queryRunner.query(
      `ALTER TABLE "directors" DROP CONSTRAINT "FK_8d50ccf56fac0296d645f94d10c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "directors" DROP CONSTRAINT "FK_a49091e4f464b19d5428d21fc1f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_aa8edc7905ad764f85924569647"`,
    );
    await queryRunner.query(`DROP TABLE "samples"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_665e266ea55164abec89a0d898"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2b901dd818a2a6486994d915a6"`,
    );
    await queryRunner.query(`DROP TABLE "admins"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5656d1b6d40765ea6b135b35d4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4668d4752e6766682d1be0b346"`,
    );
    await queryRunner.query(`DROP TABLE "teachers"`);
    await queryRunner.query(`DROP TABLE "schools"`);
    await queryRunner.query(`DROP TABLE "tracks"`);
    await queryRunner.query(`DROP TABLE "track_learning_periods"`);
    await queryRunner.query(`DROP TABLE "track_calendar"`);
    await queryRunner.query(`DROP TABLE "subjects"`);
    await queryRunner.query(`DROP TABLE "semesters"`);
    await queryRunner.query(`DROP TABLE "directors"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fb3eff90b11bddf7285f9b4e28"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_aa8edc7905ad764f8592456964"`,
    );
    await queryRunner.query(`DROP TABLE "students"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_19f0320dbf4e94fabff881c0be"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_409a0298fdd86a6495e23c25c6"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
