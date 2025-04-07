import * as argon2 from 'argon2';
import { MigrationInterface, QueryRunner } from 'typeorm';

import { UserEntity } from '../src/users/entities/user.entity';

export class AddTestUser1710000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashedPassword = await argon2.hash('password');

    await queryRunner.manager.insert(UserEntity, {
      email: 'test@example.com',
      password: hashedPassword,
      firstname: 'Test',
      lastname: 'User',
      isActive: true,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(UserEntity, {
      email: 'test@example.com',
    });
  }
}
