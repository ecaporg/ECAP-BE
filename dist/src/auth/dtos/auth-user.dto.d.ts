import { RolesEnum } from '../enums/roles.enum';
export declare class AuthUserDTO {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    emailVerified: boolean;
    role: RolesEnum;
}
