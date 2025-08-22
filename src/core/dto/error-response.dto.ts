import { ApiProperty } from '@nestjs/swagger';

import { ErrorResponse } from '../exceptions/application.exception';

export class ErrorResponseDto implements ErrorResponse {
  @ApiProperty({
    description: 'String error code',
    example: 'ERROR_NOT_FOUND',
  })
  error: string;

  @ApiProperty({
    description: 'Timestamp when the error occurred',
    example: '2023-07-20T15:30:45.123Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Error message',
    example: 'User not found',
  })
  message: string;

  @ApiProperty({
    description: 'Error details',
  })
  details?: Record<string, any>;
}
