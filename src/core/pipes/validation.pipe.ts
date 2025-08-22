/* eslint-disable @typescript-eslint/ban-types */
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { BadRequestException } from 'src/core';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException(
        'Validation failed',
        this.formatErrors(errors),
      );
    }

    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: any[]) {
    return errors.reduce((acc, error) => {
      const constraints = error.constraints;

      if (constraints) {
        const property = error.property;
        acc[property] = Object.values(constraints);
      }

      if (error.children && error.children.length > 0) {
        const childErrors = this.formatErrors(error.children);
        Object.keys(childErrors).forEach((key) => {
          const property = `${error.property}.${key}`;
          acc[property] = childErrors[key];
        });
      }

      return acc;
    }, {});
  }
}

