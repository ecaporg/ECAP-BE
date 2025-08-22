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
exports.AttachToBodyInterceptor = void 0;
const common_1 = require("@nestjs/common");
let AttachToBodyInterceptor = class AttachToBodyInterceptor {
    constructor(roleMappings) {
        this.roleMappings = [];
        this.roleMappings = roleMappings;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const body = request.body;
        if (user && user.id) {
            for (const mapping of this.roleMappings) {
                if (user && user.role === mapping.role) {
                    body[mapping.path] = mapping.map
                        ? mapping.map(user)
                        : user.id;
                }
            }
        }
        return next.handle();
    }
};
exports.AttachToBodyInterceptor = AttachToBodyInterceptor;
exports.AttachToBodyInterceptor = AttachToBodyInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Array])
], AttachToBodyInterceptor);
//# sourceMappingURL=attach-to-body.interceptor.js.map