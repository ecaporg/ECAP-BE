import { Transform } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';

import { applyDecorators } from '@nestjs/common';

export function IdDecorator(Obj: any) {
  return applyDecorators(
    Transform(({ value }) =>
      typeof value === 'string'
        ? value.split(',').map(Obj)
        : Array.isArray(value)
          ? value.map(Obj)
          : [Obj(value)],
    ),
    IsArray(),
    IsOptional(),
  );
}

