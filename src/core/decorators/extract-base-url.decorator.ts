import { Request } from 'express';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ExtractBaseUrl = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const protocol = request.protocol;
    const host = request.get('host');
    return `${protocol}://${host}`;
  },
);

