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
exports.CanvasResourcesService = void 0;
const rxjs_1 = require("rxjs");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
let CanvasResourcesService = class CanvasResourcesService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    getHeaders({ access_token }) {
        return {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        };
    }
    fetchAssignment(key, courseId, assignmentId) {
        const url = `${key.url}/api/v1/courses/${courseId}/assignments/${assignmentId}`;
        return this.httpService
            .get(url, {
            headers: this.getHeaders(key),
        })
            .pipe((0, rxjs_1.map)((response) => response.data));
    }
    fetchCourse(key, courseId) {
        const url = `${key.url}/api/v1/courses/${courseId}`;
        return this.httpService
            .get(url, {
            headers: this.getHeaders(key),
        })
            .pipe((0, rxjs_1.map)((response) => response.data));
    }
    fetchEnrollment(key, accountId, enrollmentId) {
        const url = `${key.url}/api/v1/accounts/${accountId}/enrollments/${enrollmentId}`;
        return this.httpService
            .get(url, {
            headers: this.getHeaders(key),
        })
            .pipe((0, rxjs_1.map)((response) => response.data));
    }
    fetchTeachersInCourse(key, courseId) {
        const url = `${key.url}/api/v1/courses/${courseId}/users`;
        const params = {
            enrollment_type: 'teacher',
        };
        return this.httpService
            .get(url, {
            headers: this.getHeaders(key),
            params,
        })
            .pipe((0, rxjs_1.map)((response) => response.data));
    }
    fetchUsersInAccount(key, accountId, userId) {
        const url = `${key.url}/api/v1/accounts/${accountId}/users`;
        const params = {
            search_term: userId,
        };
        return this.httpService
            .get(url, {
            headers: this.getHeaders(key),
            params,
        })
            .pipe((0, rxjs_1.map)((response) => response.data));
    }
    fetchSubmission(key, courseId, assignmentId, userId) {
        const url = `${key.url}/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions/${userId}`;
        return this.httpService
            .get(url, {
            headers: this.getHeaders(key),
        })
            .pipe((0, rxjs_1.map)((response) => response.data));
    }
};
exports.CanvasResourcesService = CanvasResourcesService;
exports.CanvasResourcesService = CanvasResourcesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], CanvasResourcesService);
//# sourceMappingURL=canvas-resources.service.js.map