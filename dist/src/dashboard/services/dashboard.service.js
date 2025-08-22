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
exports.DashboardService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const core_1 = require("../../core");
const academic_year_service_1 = require("../../track/services/academic-year.service");
const track_learning_period_service_1 = require("../../track/services/track-learning-period.service");
const roles_enum_1 = require("../../users/enums/roles.enum");
let DashboardService = class DashboardService {
    constructor(trackLearningPeriodService, academicYearService) {
        this.trackLearningPeriodService = trackLearningPeriodService;
        this.academicYearService = academicYearService;
    }
    async getDashboardStats(options, user) {
        const teacherStats = await this.getTeacherStats(options);
        if (user.role === roles_enum_1.RolesEnum.TEACHER) {
            return this.clearStats(teacherStats);
        }
        const directorStats = await this.getDirectorStats(teacherStats);
        if (user.role === roles_enum_1.RolesEnum.DIRECTOR) {
            return this.clearStats(directorStats);
        }
        const adminStats = await this.getAdminStats(directorStats);
        return this.clearStats(adminStats);
    }
    async clearStats(stats) {
        delete stats.groups;
        delete stats.periodAverages;
        return stats;
    }
    async getTeacherStats(options) {
        const filters = (0, core_1.extractPaginationOptions)(options).filters;
        const currentAcademicYears = await this.academicYearService.findCurrentAcademicYears();
        if (currentAcademicYears.length)
            filters.track = {
                ...filters.track,
                academic_year_id: (0, typeorm_1.In)(currentAcademicYears.map((year) => year.id)),
            };
        const now = new Date();
        const learningPeriods = await this.trackLearningPeriodService.findBy({
            where: { ...filters },
        });
        if (!learningPeriods.length) {
            return {
                academicYear: currentAcademicYears[0] || null,
                academies: [],
                groups: [],
                periodAverages: [],
                yearToDateCompliance: 0,
                currentLP: {
                    learningPeriods: [],
                    compliance: 0,
                    completed: false,
                },
                previousLP: {
                    learningPeriods: [],
                    compliance: 0,
                    completed: false,
                },
                beforeThePreviousOne: {
                    learningPeriods: [],
                    compliance: 0,
                    completed: false,
                },
                upcomingLP: {
                    learningPeriods: [],
                    compliance: 0,
                    completed: false,
                },
            };
        }
        const periodGroups = this.groupLearningPeriods(learningPeriods);
        const currentPeriodIndex = this.findCurrentPeriodIndex(periodGroups, now);
        const periodAverages = await this.calculatePeriodAverages(periodGroups
            .slice(0, currentPeriodIndex === -1
            ? periodGroups.length
            : currentPeriodIndex + 1)
            .flatMap(([, periods]) => periods), filters);
        const periodStats = this.calculatePeriodStats(periodGroups, now, periodAverages);
        return {
            groups: periodGroups,
            periodAverages,
            academicYear: currentAcademicYears[0],
            ...periodStats,
        };
    }
    async getDirectorStats(baseStats) {
        return {
            ...baseStats,
            yearToDateCompliance: this.calculateCompliance(baseStats.periodAverages, null, null, null),
        };
    }
    async getAdminStats(baseStats) {
        const academies = this.calculateAcademyStats(baseStats);
        return {
            ...baseStats,
            academies,
        };
    }
    findCurrentPeriodIndex(groups, now) {
        return groups.findIndex(([key]) => key.start_date <= now && key.end_date >= now);
    }
    calculatePeriodStats(groups, now, averages) {
        const currentIndex = this.findCurrentPeriodIndex(groups, now);
        return [
            groups[currentIndex - 2],
            groups[currentIndex - 1],
            groups[currentIndex],
            groups[currentIndex + 1],
        ]
            .map((period) => this.createPeriodStats(period, averages))
            .reduce((acc, stats, index) => ({
            ...acc,
            [['beforeThePreviousOne', 'previousLP', 'currentLP', 'upcomingLP'][index]]: stats,
        }), {});
    }
    calculateAcademyStats(stats) {
        const academies = stats.periodAverages
            .filter((avg) => avg.academy_id && !avg.start_date && !avg.end_date)
            .map((avg) => {
            const compliance = this.calculateCompliance(stats.periodAverages, this.formatDate(stats.currentLP.learningPeriods[0]?.start_date), this.formatDate(stats.currentLP.learningPeriods[0]?.end_date), avg.academy_id);
            return {
                ...avg,
                compliance,
                yearToDateCompliance: Number(avg.percentage),
            };
        });
        return academies;
    }
    createPeriodStats(period, averages) {
        if (!period || !period[0]) {
            return {
                learningPeriods: [],
                compliance: 0,
                completed: false,
            };
        }
        const compliance = this.calculateCompliance(averages, this.formatDate(period[0].start_date), this.formatDate(period[0].end_date), null) || 0;
        return {
            learningPeriods: period[1] || [],
            compliance,
            completed: compliance >= 100,
        };
    }
    calculateCompliance(averages, startDate, endDate, academyId) {
        const percentages = averages
            .filter((avg) => avg.start_date == startDate &&
            avg.end_date == endDate &&
            avg.academy_id == academyId)
            .map(({ percentage }) => percentage)
            .filter((percentage) => percentage != null);
        return (percentages.reduce((acc, curr) => acc + curr, 0) / percentages.length);
    }
    groupLearningPeriods(periods) {
        const groups = new Map();
        periods.forEach((period) => {
            const key = this.createPeriodKey(period);
            if (!groups.has(key)) {
                groups.set(key, []);
            }
            groups.get(key).push(period);
        });
        return Array.from(groups.entries())
            .map(([key, periods]) => [
            {
                start_date: new Date(key.split(' ')[0]),
                end_date: new Date(key.split(' ')[1]),
            },
            periods,
        ])
            .sort(([key1], [key2]) => key1.start_date.getTime() - key2.start_date.getTime() ||
            key1.end_date.getTime() - key2.end_date.getTime());
    }
    async calculatePeriodAverages(periods, filters) {
        const queryBuilder = this.trackLearningPeriodService
            .getRepository()
            .createQueryBuilder('track_learning_periods')
            .select(`
        avg(student_lp_enrollments.percentage) as percentage,
        track_learning_periods.start_date as start_date,
        track_learning_periods.end_date as end_date,
        student.academy_id as academy_id,
        academy.name as academy_name
        `)
            .leftJoin('track_learning_periods.track', 'track')
            .leftJoin('track_learning_periods.student_lp_enrollments', 'student_lp_enrollments')
            .leftJoin('student_lp_enrollments.student', 'student')
            .leftJoin('student.academy', 'academy')
            .where('track_learning_periods.id IN (:...ids)', {
            ids: periods.map((period) => period.id),
        });
        this.applyFilters(queryBuilder, filters);
        queryBuilder.groupBy(`GROUPING SETS 
      (
        (track_learning_periods.start_date, track_learning_periods.end_date, student.academy_id, academy.name), 
        (track_learning_periods.start_date, track_learning_periods.end_date), 
        (student.academy_id, academy.name), 
        ()
      )`);
        return queryBuilder.getRawMany().then((results) => results.map((result) => ({
            ...result,
            start_date: result.start_date
                ? this.formatDate(result.start_date)
                : null,
            end_date: result.end_date ? this.formatDate(result.end_date) : null,
        })));
    }
    applyFilters(queryBuilder, filters) {
        if (filters['track.tenant.admins.id']) {
            queryBuilder.andWhere('track.tenant.admins.id = :adminId', {
                adminId: filters['track.tenant.admins.id'],
            });
        }
        if (filters['student_lp_enrollments.student.academy_id']) {
            queryBuilder.andWhere('student.academy_id = :academyId', {
                academyId: filters['student_lp_enrollments.student.academy_id'],
            });
        }
        if (filters['student_lp_enrollments.teacher_school_year_enrollment.teacher.id']) {
            queryBuilder
                .leftJoin('student_lp_enrollments.teacher_school_year_enrollment', 'teacher_school_year_enrollment')
                .leftJoin('teacher_school_year_enrollment.teacher', 'teacher')
                .andWhere('teacher.id = :teacherId', {
                teacherId: filters['student_lp_enrollments.teacher_school_year_enrollment.teacher.id'],
            });
        }
    }
    createPeriodKey(period) {
        return `${this.formatDate(period.start_date)} ${this.formatDate(period.end_date)}`;
    }
    formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [track_learning_period_service_1.TrackLearningPeriodService,
        academic_year_service_1.AcademicYearService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map