import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { EmailAvailable } from '../../auth/validations/email-available';

import { RolesEnum } from '../enums/roles.enum';

export class CreateUserDTO {
  @ApiProperty({
    type: String,
    description: 'new user email',
  })
  @IsEmail()
  @EmailAvailable({
    message: 'email was taken by another user',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'user password',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    description: 'user name',
  })
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  name: string;

  @ApiProperty({
    type: String,
    description: 'user role',
  })
  @IsOptional()
  @IsString()
  role: RolesEnum;
}
