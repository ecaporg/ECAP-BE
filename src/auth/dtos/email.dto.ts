import { IsEmail, IsNotEmpty } from 'class-validator';

import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication - email')
export class EmailDTO {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}
