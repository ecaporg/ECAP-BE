import { IsNotEmpty, IsString, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class PasswordDTO {
  @ApiProperty({
    description: 'User password',
    example: 'newSecurePassword123',
    minLength: 6,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
