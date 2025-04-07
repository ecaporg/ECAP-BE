import { GenericEntity } from '../../core/generic-entity';
import { UserRoleEntity } from './user-role.entity';
export declare class UserEntity extends GenericEntity {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    isActive: boolean;
    emailVerified: boolean;
    refreshToken?: string;
    userRoles: UserRoleEntity[];
}
