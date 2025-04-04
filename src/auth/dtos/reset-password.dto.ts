import { IsNotEmpty, IsString, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDTO {
  @ApiProperty({
    description: 'Current password',
    example: 'currentPassword123',
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Current password is required' })
  oldPassword: string;

  @ApiProperty({
    description: 'New password',
    example: 'newSecurePassword123',
    minLength: 6,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  newPassword: string;
}
