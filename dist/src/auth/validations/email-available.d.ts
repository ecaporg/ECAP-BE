import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { UsersService } from '../../users/users.service';
export declare class EmailAvailableConstraint implements ValidatorConstraintInterface {
    private readonly userService;
    constructor(userService: UsersService);
    validate(email: string): Promise<boolean>;
}
export declare function EmailAvailable(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
