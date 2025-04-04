import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDTO {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  lastname: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Account active status',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Email verification status',
    example: true,
  })
  emailVerified: boolean;

  @ApiProperty({
    description: 'User roles',
    type: [String],
    example: ['user'],
  })
  roles: string[];
}
