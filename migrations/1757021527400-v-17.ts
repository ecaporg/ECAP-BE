import { MigrationInterface, QueryRunner } from 'typeorm';

export class V171757021527400 implements MigrationInterface {
  name = 'V171757021527400';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "schools" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "tenant_id" integer NOT NULL, "name" character varying(250) NOT NULL, CONSTRAINT "PK_95b932e47ac129dd8e23a0db548" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sample_flag_errors" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" integer NOT NULL, "user_id" integer, "comment" character varying NOT NULL, CONSTRAINT "PK_0caf047533b0399cd4bc26b980b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sample_flag_missing_work" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" integer NOT NULL, "user_id" integer, "reason" character varying NOT NULL, CONSTRAINT "PK_eb8da7bc81401e6e05c305af349" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sample_flag_completed" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" integer NOT NULL, "user_id" integer, "message" character varying NOT NULL, CONSTRAINT "PK_72d8a98ddf845484d3cb1f35112" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sample_flag_rejected" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" integer NOT NULL, "user_id" integer, "reason" character varying NOT NULL, CONSTRAINT "PK_961bf01c879380765f2bb29c086" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."samples_status_enum" AS ENUM('CREATED', 'COMPLETED', 'FLAGGED_TO_ADMIN', 'PENDING', 'ERRORS_FOUND', 'MISSING_SAMPLE', 'REASON_REJECTED')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."samples_flag_category_enum" AS ENUM('MISSING_SAMPLE', 'REASON_REJECTED', 'ERROR_IN_SAMPLE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "samples" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "canvas_id" character varying(20), "status" "public"."samples_status_enum" NOT NULL, "flag_category" "public"."samples_flag_category_enum", "done_by_id" integer, "grade" character varying, "date" date, "preview_url" character varying(255), CONSTRAINT "PK_d68b5b3bd25a6851b033fb63444" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "student_lp_enrollment_assignments" ("student_lp_enrollment_id" integer NOT NULL, "assignment_id" integer NOT NULL, "sample_id" integer, CONSTRAINT "REL_edf36f799cdeb1a5938c821835" UNIQUE ("sample_id"), CONSTRAINT "PK_79b09591dbfc7b27cc78401885b" PRIMARY KEY ("student_lp_enrollment_id", "assignment_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "assignments" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "canvas_id" character varying(20), "course_id" integer NOT NULL, "name" character varying(250) NOT NULL, "due_at" date NOT NULL, CONSTRAINT "PK_c54ca359535e0012b04dcbd80ee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "courses" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "canvas_id" character varying(20), "name" character varying(250) NOT NULL, "tenant_id" integer NOT NULL, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "academic_years" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "from" integer NOT NULL, "to" integer NOT NULL, CONSTRAINT "PK_2021b90bfbfa6c9da7df34ca1cf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "semesters" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "track_id" integer NOT NULL, "name" character varying(250) NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, CONSTRAINT "PK_25c393e2e76b3e32e87a79b1dc2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "track_calendar" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" integer NOT NULL, "days" json NOT NULL, CONSTRAINT "PK_b2f2a7e02e6192f4ada71624864" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "track_learning_periods" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "track_id" integer NOT NULL, "name" character varying(250) NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, CONSTRAINT "PK_d829f156a60ce0e53880b5ff78a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tracks" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "tenant_id" integer NOT NULL, "name" character varying(250) NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "academic_year_id" integer NOT NULL, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "errors" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "tenant_id" integer NOT NULL, "message" text NOT NULL, CONSTRAINT "PK_f1ab2df89a11cd21f48ff90febb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "keys" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" integer NOT NULL, "access_token" character varying(512), "session_token" character varying(1024), "url" character varying(512), CONSTRAINT "PK_e63d5d51e0192635ab79aa49644" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tenants" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying(250), CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "academies" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "tenant_id" integer NOT NULL, "name" character varying(250) NOT NULL, CONSTRAINT "PK_abce78680fbad7d56c23118f9e0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "students" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" integer NOT NULL, "school_id" integer, "academy_id" integer, CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "student_lp_enrollments" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "student_id" integer NOT NULL, "student_grade" character varying(40) NOT NULL DEFAULT 'Unknown', "learning_period_id" integer NOT NULL, "completed" boolean NOT NULL DEFAULT false, "percentage" numeric(5,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_2ba9006efea9f1fbf4ee7aff87a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "teacher_enrollments" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "school_id" integer NOT NULL, "teacher_id" integer NOT NULL, "academic_year_id" integer NOT NULL, CONSTRAINT "PK_23cb2da4ad8eb829080396fa39e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "teachers" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" integer NOT NULL, CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "admins" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" integer NOT NULL, "tenant_id" integer NOT NULL, CONSTRAINT "PK_0708655218ae3adbbc7e971beae" PRIMARY KEY ("id", "tenant_id"))`,
    );
    await queryRunner.query(
      `COMMENT ON TABLE "admins" IS 'Admins and superadmins table'`,
    );
    await queryRunner.query(
      `CREATE TABLE "directors" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" integer NOT NULL, "tenant_id" integer NOT NULL, "academy_id" integer NOT NULL, CONSTRAINT "PK_c219ccc6571c077c8ef8b86563e" PRIMARY KEY ("id", "tenant_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "emailVerified" boolean NOT NULL DEFAULT false, "refreshToken" character varying, "role" character varying, "canvas_additional_info" json, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "stu_lp_enr_tea_sch_yea_enr_tea_sch_yea_enr" ("studentLpEnrollmentsId" integer NOT NULL, "teacherSchoolYearEnrollmentsId" integer NOT NULL, CONSTRAINT "PK_0d6d7294a41f2dcab8504fef22f" PRIMARY KEY ("studentLpEnrollmentsId", "teacherSchoolYearEnrollmentsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_29734c3be43837b8b899781f13" ON "stu_lp_enr_tea_sch_yea_enr_tea_sch_yea_enr" ("studentLpEnrollmentsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b3ee10ce056348959ce79bee13" ON "stu_lp_enr_tea_sch_yea_enr_tea_sch_yea_enr" ("teacherSchoolYearEnrollmentsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "schools" ADD CONSTRAINT "FK_cf7fc9b8bccbe84cf907d79d420" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_errors" ADD CONSTRAINT "FK_9ec6f8cee254cf0dde54cc21c93" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_errors" ADD CONSTRAINT "FK_0caf047533b0399cd4bc26b980b" FOREIGN KEY ("id") REFERENCES "samples"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_missing_work" ADD CONSTRAINT "FK_ae51d1004dce2cc6e9bcc8e3ed2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_missing_work" ADD CONSTRAINT "FK_eb8da7bc81401e6e05c305af349" FOREIGN KEY ("id") REFERENCES "samples"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_completed" ADD CONSTRAINT "FK_a1e6cff5355db187037043a62df" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_completed" ADD CONSTRAINT "FK_72d8a98ddf845484d3cb1f35112" FOREIGN KEY ("id") REFERENCES "samples"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_rejected" ADD CONSTRAINT "FK_b9bea24f0f61a9d4a9631bfa443" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_rejected" ADD CONSTRAINT "FK_961bf01c879380765f2bb29c086" FOREIGN KEY ("id") REFERENCES "samples"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "samples" ADD CONSTRAINT "FK_e75c769d4a90201879cdf31c8aa" FOREIGN KEY ("done_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_lp_enrollment_assignments" ADD CONSTRAINT "FK_97c885c5ccd63758ab503d33850" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_lp_enrollment_assignments" ADD CONSTRAINT "FK_edf36f799cdeb1a5938c8218357" FOREIGN KEY ("sample_id") REFERENCES "samples"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_lp_enrollment_assignments" ADD CONSTRAINT "FK_699c02e0bd0fe731402c98d86bb" FOREIGN KEY ("student_lp_enrollment_id") REFERENCES "student_lp_enrollments"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "assignments" ADD CONSTRAINT "FK_33f833f305070d2d4e6305d8a0c" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "FK_d08a72c4c2359e5ab8142058113" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "semesters" ADD CONSTRAINT "FK_d859f21b7b68bba134c9e163e29" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" ADD CONSTRAINT "FK_b2f2a7e02e6192f4ada71624864" FOREIGN KEY ("id") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_learning_periods" ADD CONSTRAINT "FK_21cce0b7c46b5687e745d07b838" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_d02972348fb06895fa5b580a031" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_2a4957dd7a6de6855b587b06280" FOREIGN KEY ("academic_year_id") REFERENCES "academic_years"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "errors" ADD CONSTRAINT "FK_ba462d8fc830a194d8a0f94e6b8" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "keys" ADD CONSTRAINT "FK_e63d5d51e0192635ab79aa49644" FOREIGN KEY ("id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "academies" ADD CONSTRAINT "FK_452de3633c666bf624f2d95fc4c" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_aa8edc7905ad764f85924569647" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_7d7f07271ad4ce999880713f05e" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_686c602a46701b052bddcbc6ba8" FOREIGN KEY ("academy_id") REFERENCES "academies"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_lp_enrollments" ADD CONSTRAINT "FK_f7258e4d6f49c0e2fef4fd109ae" FOREIGN KEY ("learning_period_id") REFERENCES "track_learning_periods"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_lp_enrollments" ADD CONSTRAINT "FK_37a28c9b6e409febabbd437670b" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "teacher_enrollments" ADD CONSTRAINT "FK_91d55a0d56fb766ae820b9da2db" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "teacher_enrollments" ADD CONSTRAINT "FK_7e7f633e5e6af67353f728c0b16" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "teacher_enrollments" ADD CONSTRAINT "FK_196e4e2e1db4568d1c4ebca6624" FOREIGN KEY ("academic_year_id") REFERENCES "academic_years"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD CONSTRAINT "FK_a8d4f83be3abe4c687b0a0093c8" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "admins" ADD CONSTRAINT "FK_e3b38270c97a854c48d2e80874e" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "admins" ADD CONSTRAINT "FK_bce8274fc30027f8afbe61a2e56" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "directors" ADD CONSTRAINT "FK_a9ae28f00c93801aa034a2c1773" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "directors" ADD CONSTRAINT "FK_31bbf487b3b98b952173aaf83b3" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "directors" ADD CONSTRAINT "FK_8368997d5eb9dba3523df0add32" FOREIGN KEY ("academy_id") REFERENCES "academies"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "stu_lp_enr_tea_sch_yea_enr_tea_sch_yea_enr" ADD CONSTRAINT "FK_29734c3be43837b8b899781f13e" FOREIGN KEY ("studentLpEnrollmentsId") REFERENCES "student_lp_enrollments"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "stu_lp_enr_tea_sch_yea_enr_tea_sch_yea_enr" ADD CONSTRAINT "FK_b3ee10ce056348959ce79bee133" FOREIGN KEY ("teacherSchoolYearEnrollmentsId") REFERENCES "teacher_enrollments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stu_lp_enr_tea_sch_yea_enr_tea_sch_yea_enr" DROP CONSTRAINT "FK_b3ee10ce056348959ce79bee133"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stu_lp_enr_tea_sch_yea_enr_tea_sch_yea_enr" DROP CONSTRAINT "FK_29734c3be43837b8b899781f13e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "directors" DROP CONSTRAINT "FK_8368997d5eb9dba3523df0add32"`,
    );
    await queryRunner.query(
      `ALTER TABLE "directors" DROP CONSTRAINT "FK_31bbf487b3b98b952173aaf83b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "directors" DROP CONSTRAINT "FK_a9ae28f00c93801aa034a2c1773"`,
    );
    await queryRunner.query(
      `ALTER TABLE "admins" DROP CONSTRAINT "FK_bce8274fc30027f8afbe61a2e56"`,
    );
    await queryRunner.query(
      `ALTER TABLE "admins" DROP CONSTRAINT "FK_e3b38270c97a854c48d2e80874e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" DROP CONSTRAINT "FK_a8d4f83be3abe4c687b0a0093c8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teacher_enrollments" DROP CONSTRAINT "FK_196e4e2e1db4568d1c4ebca6624"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teacher_enrollments" DROP CONSTRAINT "FK_7e7f633e5e6af67353f728c0b16"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teacher_enrollments" DROP CONSTRAINT "FK_91d55a0d56fb766ae820b9da2db"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_lp_enrollments" DROP CONSTRAINT "FK_37a28c9b6e409febabbd437670b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_lp_enrollments" DROP CONSTRAINT "FK_f7258e4d6f49c0e2fef4fd109ae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_686c602a46701b052bddcbc6ba8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_7d7f07271ad4ce999880713f05e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_aa8edc7905ad764f85924569647"`,
    );
    await queryRunner.query(
      `ALTER TABLE "academies" DROP CONSTRAINT "FK_452de3633c666bf624f2d95fc4c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "keys" DROP CONSTRAINT "FK_e63d5d51e0192635ab79aa49644"`,
    );
    await queryRunner.query(
      `ALTER TABLE "errors" DROP CONSTRAINT "FK_ba462d8fc830a194d8a0f94e6b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_2a4957dd7a6de6855b587b06280"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_d02972348fb06895fa5b580a031"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_learning_periods" DROP CONSTRAINT "FK_21cce0b7c46b5687e745d07b838"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_calendar" DROP CONSTRAINT "FK_b2f2a7e02e6192f4ada71624864"`,
    );
    await queryRunner.query(
      `ALTER TABLE "semesters" DROP CONSTRAINT "FK_d859f21b7b68bba134c9e163e29"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "FK_d08a72c4c2359e5ab8142058113"`,
    );
    await queryRunner.query(
      `ALTER TABLE "assignments" DROP CONSTRAINT "FK_33f833f305070d2d4e6305d8a0c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_lp_enrollment_assignments" DROP CONSTRAINT "FK_699c02e0bd0fe731402c98d86bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_lp_enrollment_assignments" DROP CONSTRAINT "FK_edf36f799cdeb1a5938c8218357"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_lp_enrollment_assignments" DROP CONSTRAINT "FK_97c885c5ccd63758ab503d33850"`,
    );
    await queryRunner.query(
      `ALTER TABLE "samples" DROP CONSTRAINT "FK_e75c769d4a90201879cdf31c8aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_rejected" DROP CONSTRAINT "FK_961bf01c879380765f2bb29c086"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_rejected" DROP CONSTRAINT "FK_b9bea24f0f61a9d4a9631bfa443"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_completed" DROP CONSTRAINT "FK_72d8a98ddf845484d3cb1f35112"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sample_flag_completed" DROP CONSTRAINT "FK_a1e6cff5355db187037043a62df"`,
    );
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
    await queryRunner.query(
      `ALTER TABLE "schools" DROP CONSTRAINT "FK_cf7fc9b8bccbe84cf907d79d420"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b3ee10ce056348959ce79bee13"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_29734c3be43837b8b899781f13"`,
    );
    await queryRunner.query(
      `DROP TABLE "stu_lp_enr_tea_sch_yea_enr_tea_sch_yea_enr"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "directors"`);
    await queryRunner.query(`COMMENT ON TABLE "admins" IS NULL`);
    await queryRunner.query(`DROP TABLE "admins"`);
    await queryRunner.query(`DROP TABLE "teachers"`);
    await queryRunner.query(`DROP TABLE "teacher_enrollments"`);
    await queryRunner.query(`DROP TABLE "student_lp_enrollments"`);
    await queryRunner.query(`DROP TABLE "students"`);
    await queryRunner.query(`DROP TABLE "academies"`);
    await queryRunner.query(`DROP TABLE "tenants"`);
    await queryRunner.query(`DROP TABLE "keys"`);
    await queryRunner.query(`DROP TABLE "errors"`);
    await queryRunner.query(`DROP TABLE "tracks"`);
    await queryRunner.query(`DROP TABLE "track_learning_periods"`);
    await queryRunner.query(`DROP TABLE "track_calendar"`);
    await queryRunner.query(`DROP TABLE "semesters"`);
    await queryRunner.query(`DROP TABLE "academic_years"`);
    await queryRunner.query(`DROP TABLE "courses"`);
    await queryRunner.query(`DROP TABLE "assignments"`);
    await queryRunner.query(`DROP TABLE "student_lp_enrollment_assignments"`);
    await queryRunner.query(`DROP TABLE "samples"`);
    await queryRunner.query(`DROP TYPE "public"."samples_flag_category_enum"`);
    await queryRunner.query(`DROP TYPE "public"."samples_status_enum"`);
    await queryRunner.query(`DROP TABLE "sample_flag_rejected"`);
    await queryRunner.query(`DROP TABLE "sample_flag_completed"`);
    await queryRunner.query(`DROP TABLE "sample_flag_missing_work"`);
    await queryRunner.query(`DROP TABLE "sample_flag_errors"`);
    await queryRunner.query(`DROP TABLE "schools"`);
  }
}
