import { GenericEntity } from '../../core/generic-entity';
import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';
export declare class UserRoleEntity extends GenericEntity {
    user: UserEntity;
    role: RoleEntity;
}
