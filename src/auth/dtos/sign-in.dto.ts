import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
export class SignInDTO {
  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'securePassword123',
    minLength: 6,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

