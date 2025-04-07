import { RoleEntity } from '../../users/entities/role.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { UserRoleEntity } from '../../users/entities/user-role.entity';
declare const _default: {
    user: {
        entity: typeof UserEntity;
        data: ({
            id: number;
            firstname: string;
            lastname: string;
            email: string;
            isActive: boolean;
            emailVerified: boolean;
            password: string;
            refreshToken?: undefined;
        } | {
            id: number;
            firstname: string;
            lastname: string;
            isActive: boolean;
            emailVerified: boolean;
            email: string;
            password: string;
            refreshToken: string;
        } | {
            id: number;
            firstname: string;
            lastname: string;
            email: string;
            password: string;
            isActive: boolean;
            emailVerified?: undefined;
            refreshToken?: undefined;
        })[];
    };
    role: {
        entity: typeof RoleEntity;
        data: {
            id: number;
            name: string;
        }[];
    };
    userRole: {
        entity: typeof UserRoleEntity;
        data: {
            id: number;
            user: number;
            role: number;
        }[];
    };
};
export default _default;
