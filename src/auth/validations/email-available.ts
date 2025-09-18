import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { NotFoundException } from '../../core';
import { UsersService } from '../services/users.service';

@ValidatorConstraint({ async: true })
export class EmailAvailableConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}

  async validate(email: string): Promise<boolean> {
    try {
      const user = await this.userService.findUserByEmail(email);
      return !Boolean(user);
    } catch (error) {
      return error instanceof NotFoundException;
    }
  }
}
export function EmailAvailable(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailAvailableConstraint,
    });
  };
}
