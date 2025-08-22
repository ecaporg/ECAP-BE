"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWAGGER_API_MODELS = void 0;
const auth_user_1 = require("../../auth/types/auth-user");
const student_enrollment_entity_1 = require("../../enrollment/entities/student-enrollment.entity");
const teacher_enrollment_entity_1 = require("../../enrollment/entities/teacher-enrollment.entity");
const academy_entity_1 = require("../../school/entities/academy.entity");
const school_entity_1 = require("../../school/entities/school.entity");
const staff_entity_1 = require("../../staff/entities/staff.entity");
const sample_entity_1 = require("../../students/entities/sample.entity");
const sample_flag_entity_1 = require("../../students/entities/sample-flag.entity");
const student_entity_1 = require("../../students/entities/student.entity");
const tenant_entity_1 = require("../../tenant/entities/tenant.entity");
const academic_year_entity_1 = require("../../track/entities/academic-year.entity");
const semester_entity_1 = require("../../track/entities/semester.entity");
const subject_entity_1 = require("../../track/entities/subject.entity");
const track_entity_1 = require("../../track/entities/track.entity");
const track_calendar_entity_1 = require("../../track/entities/track-calendar.entity");
const track_learning_period_entity_1 = require("../../track/entities/track-learning-period.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const error_response_dto_1 = require("../dto/error-response.dto");
exports.SWAGGER_API_MODELS = [
    error_response_dto_1.ErrorResponseDto,
    auth_user_1.AuthUser,
    user_entity_1.UserEntity,
    academy_entity_1.AcademyEntity,
    academic_year_entity_1.AcademicYearEntity,
    school_entity_1.SchoolEntity,
    semester_entity_1.SemesterEntity,
    teacher_enrollment_entity_1.TeacherSchoolYearEnrollmentEntity,
    student_enrollment_entity_1.StudentLPEnrollmentEntity,
    tenant_entity_1.TenantEntity,
    subject_entity_1.SubjectEntity,
    track_calendar_entity_1.TrackCalendarEntity,
    track_learning_period_entity_1.TrackLearningPeriodEntity,
    track_entity_1.TrackEntity,
    staff_entity_1.DirectorEntity,
    staff_entity_1.AdminEntity,
    staff_entity_1.TeacherEntity,
    sample_entity_1.SampleEntity,
    student_entity_1.StudentEntity,
    sample_flag_entity_1.SampleFlagErrorEntity,
    sample_flag_entity_1.SampleFlagMissingWorkEntity,
    sample_flag_entity_1.SampleFlagRejectedEntity,
    sample_flag_entity_1.SampleFlagCompletedEntity,
];
//# sourceMappingURL=swagger.models.js.map