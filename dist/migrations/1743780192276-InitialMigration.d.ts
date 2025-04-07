import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class InitialMigration1743780192276 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
