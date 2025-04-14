import { ApiProperty, ApiTags } from '@nestjs/swagger';

import { RolesEnum } from '@/users/enums/roles.enum';

@ApiTags('Authentication')
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
    description: 'User role',
    type: RolesEnum,
    example: RolesEnum.ADMIN,
  })
  role: RolesEnum;
}
