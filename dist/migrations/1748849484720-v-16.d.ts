import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class V161748849484720 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
