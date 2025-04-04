import { ApiProperty } from '@nestjs/swagger';

import { IAuthUser } from '../types/auth-user';

export class LoginResponseDTO {
  @ApiProperty({
    description: 'JWT access token for authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'JWT refresh token for renewing access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Authenticated user information',
    type: 'object',
    example: {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      isActive: true,
      emailVerified: true,
      roles: ['user'],
    },
  })
  user: IAuthUser;
}
