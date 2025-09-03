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

/**
 * Decorator that takes value from another field during transformation.
 * IMPORTANT: Must be the FIRST decorator in the chain to work properly!
 *
 * @param sourceFieldName - Name of the field from which to take the value
 *
 * @example
 * ```typescript
 * class MyDto {
 *   originalField: string;
 *
 *   // Correct: InField is first, then other decorators
 *   @InField('originalField')
 *   @IsString()
 *   @MinLength(5)
 *   derivedField: string; // First copies the value, then applies validation
 *
 *   // Incorrect: InField is not first
 *   // @IsString()
 *   // @InField('originalField')
 *   // wrongField: string;
 * }
 * ```
 */
export function InField(sourceFieldName: string) {
  return applyDecorators(
    Transform(({ obj }) => {
      const sourceValue = obj[sourceFieldName];
      // Видаляємо оригінальне поле після копіювання
      delete obj[sourceFieldName];
      return sourceValue;
    }),
    IsOptional(),
  );
}
