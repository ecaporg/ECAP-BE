"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWAGGER_API_MODELS = void 0;
const user_entity_1 = require("../../auth/entities/user.entity");
const auth_user_1 = require("../../auth/types/auth-user");
const student_enrollment_entity_1 = require("../../domain/enrollment/entities/student-enrollment.entity");
const student_enrollment_assignment_entity_1 = require("../../domain/enrollment/entities/student-enrollment-assignment.entity");
const teacher_enrollment_entity_1 = require("../../domain/enrollment/entities/teacher-enrollment.entity");
const academy_entity_1 = require("../../domain/school/entities/academy.entity");
const school_entity_1 = require("../../domain/school/entities/school.entity");
const staff_entity_1 = require("../../domain/staff/entities/staff.entity");
const sample_entity_1 = require("../../domain/students/entities/sample.entity");
const sample_flag_entity_1 = require("../../domain/students/entities/sample-flag.entity");
const student_entity_1 = require("../../domain/students/entities/student.entity");
const assignment_entity_1 = require("../../domain/subject/entities/assignment.entity");
const course_entity_1 = require("../../domain/subject/entities/course.entity");
const key_entity_1 = require("../../domain/tenant/entities/key.entity");
const tenant_entity_1 = require("../../domain/tenant/entities/tenant.entity");
const academic_year_entity_1 = require("../../domain/track/entities/academic-year.entity");
const semester_entity_1 = require("../../domain/track/entities/semester.entity");
const track_entity_1 = require("../../domain/track/entities/track.entity");
const track_calendar_entity_1 = require("../../domain/track/entities/track-calendar.entity");
const track_learning_period_entity_1 = require("../../domain/track/entities/track-learning-period.entity");
const error_response_dto_1 = require("../dto/error-response.dto");
exports.SWAGGER_API_MODELS = [
    error_response_dto_1.ErrorResponseDto,
    auth_user_1.AuthUser,
    user_entity_1.UserEntity,
    academy_entity_1.AcademyEntity,
    school_entity_1.SchoolEntity,
    tenant_entity_1.TenantEntity,
    key_entity_1.KeyEntity,
    academic_year_entity_1.AcademicYearEntity,
    semester_entity_1.SemesterEntity,
    track_calendar_entity_1.TrackCalendarEntity,
    track_learning_period_entity_1.TrackLearningPeriodEntity,
    track_entity_1.TrackEntity,
    teacher_enrollment_entity_1.TeacherEnrollmentEntity,
    student_enrollment_entity_1.StudentLPEnrollmentEntity,
    student_enrollment_assignment_entity_1.StudentLPEnrollmentAssignmentEntity,
    course_entity_1.CourseEntity,
    assignment_entity_1.AssignmentEntity,
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