"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademyFilterInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("../../core");
const roles_enum_1 = require("../../users/enums/roles.enum");
let AcademyFilterInterceptor = class AcademyFilterInterceptor extends core_1.AttachUserIdInterceptor {
    constructor() {
        super([
            { role: roles_enum_1.RolesEnum.ADMIN, path: 'tenant_id' },
            { role: roles_enum_1.RolesEnum.SUPER_ADMIN, path: 'tenant_id' },
            { role: roles_enum_1.RolesEnum.DIRECTOR, path: 'tenant.directors.id' },
            {
                role: roles_enum_1.RolesEnum.TEACHER,
                path: 'tenant.schools.teacher_school_year_enrollments.teacher_id',
            },
        ]);
    }
};
exports.AcademyFilterInterceptor = AcademyFilterInterceptor;
exports.AcademyFilterInterceptor = AcademyFilterInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AcademyFilterInterceptor);
//# sourceMappingURL=academy-filter.interceptor.js.map