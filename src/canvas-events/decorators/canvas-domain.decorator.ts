import { Request } from 'express';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { extractCanvasDomain } from '../utils/canvas-domain.util';

export const CanvasDomain = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const headers = request.headers;

    const possibleSources = [
      headers.origin,
      headers.referer,
      headers['x-forwarded-host'],
      headers['x-original-host'],
      headers.host,
    ].filter(Boolean) as string[];

    console.log(
      `Extracted possible sources for canvas domain: ${JSON.stringify(possibleSources, null, 2)}`,
    );

    return extractCanvasDomain(possibleSources);
  },
);
