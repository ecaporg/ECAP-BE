import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddEliteData201746984777855 implements MigrationInterface {
    private password;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
    private createTenant;
    private createSchool;
    private createAcademy;
    private createDirectors;
    private createAcademicYears;
    private createSemesters;
    private createTeachersAndEnrollments;
    private createTracks;
    private createSubjects;
    private createStudents;
    private createLearningPeriods;
    private createStudentLPEnrollments;
    private createSamples;
    private createSampleFlags;
    private createAdmin;
    private recalculateAssignmentPeriods;
    private deleteRedunantData;
}
