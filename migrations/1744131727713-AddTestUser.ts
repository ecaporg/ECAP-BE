// import * as argon2 from 'argon2';
// import { MigrationInterface, QueryRunner } from 'typeorm';

// import { UserEntity } from '../src/users/entities/user.entity';

// export class AddTestUser1710000000000 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     const hashedPassword = await argon2.hash('password');

//     await queryRunner.manager.insert(UserEntity, {
//       email: 'admin@test.com',
//       password: hashedPassword,
//       firstname: 'Admin',
//       lastname: 'Test',
//       isActive: true,
//       emailVerified: true,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     });
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.manager.delete(UserEntity, {
//       email: 'admin@test.com',
//     });
//   }
// }
