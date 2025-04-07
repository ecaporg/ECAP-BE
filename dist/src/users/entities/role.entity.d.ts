import { GenericEntity } from '../../core/generic-entity';
import { RolesEnum } from '../enums/roles.enum';
import { UserRoleEntity } from './user-role.entity';
export declare class RoleEntity extends GenericEntity {
    name: RolesEnum;
    userRoles: UserRoleEntity[];
}
