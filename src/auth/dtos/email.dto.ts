import { IsEmail } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class EmailDTO {
  @ApiProperty({
    type: String,
    description: 'user email',
  })
  @IsEmail()
  email: string;
}
