import { RoleEntity } from '../entities/role.entity';
import { UserEntity } from '../entities/user.entity';
import { UserRoleEntity } from '../entities/user-role.entity';
declare const _default: {
    user: {
        entity: typeof UserEntity;
        data: {
            id: number;
            firstname: string;
            lastname: string;
            email: string;
            password: string;
        }[];
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
