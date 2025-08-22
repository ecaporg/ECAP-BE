import { IsEmail, IsNotEmpty } from 'class-validator';

import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication - email')
export class ChangeEmailDTO {
  @IsEmail()
  email: string;

  @IsEmail()
  newEmail: string;
}

@ApiTags('Authentication - email')
export class ChangeEmailPasswordDTO {
  @ApiProperty({
    type: String,
    description: 'user password',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    description: 'new user email',
  })
  @IsEmail()
  newEmail: string;
}
