import { RolesEnum } from '../enums/roles.enum';
export declare class CreateUserDTO {
    email: string;
    password: string;
    name: string;
    role: RolesEnum;
}
