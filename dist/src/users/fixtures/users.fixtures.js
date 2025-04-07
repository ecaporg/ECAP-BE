"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const role_entity_1 = require("../entities/role.entity");
const user_entity_1 = require("../entities/user.entity");
const user_role_entity_1 = require("../entities/user-role.entity");
exports.default = {
    user: {
        entity: user_entity_1.UserEntity,
        data: [
            {
                id: 1,
                firstname: 'Jorge',
                lastname: 'Ramirez',
                email: 'jorge@mail.com',
                password: 'sha1231',
            },
            {
                id: 2,
                firstname: 'James',
                lastname: 'Robertson',
                email: 'james@mail.com',
                password: 'sha12312',
            },
            {
                id: 3,
                firstname: 'Carl',
                lastname: 'Robertson',
                email: 'carl@mail.com',
                password: 'sha12312',
            },
        ],
    },
    role: {
        entity: role_entity_1.RoleEntity,
        data: [
            {
                id: 1,
                name: 'ADMIN',
            },
            {
                id: 2,
                name: 'BASE_USER',
            },
            {
                id: 3,
                name: 'COSTUMER',
            },
        ],
    },
    userRole: {
        entity: user_role_entity_1.UserRoleEntity,
        data: [
            {
                id: 1,
                user: 1,
                role: 1,
            },
            {
                id: 2,
                user: 2,
                role: 1,
            },
            {
                id: 3,
                user: 2,
                role: 3,
            },
            {
                id: 4,
                user: 1,
                role: 2,
            },
        ],
    },
};
//# sourceMappingURL=users.fixtures.js.map