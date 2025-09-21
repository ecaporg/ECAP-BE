import { TenantEntity } from '../../../domain/tenant/entities/tenant.entity';
import { AcademicYearEntity } from '../../../domain/track/entities/academic-year.entity';
import { CanvasAssignmentDto } from './canvas-assignment.dto';
import { CanvasCourseDto } from './canvas-course.dto';
import { CanvasSubmissionDto } from './canvas-submission.dto';
import { CanvasUserDto } from './canvas-user.dto';
export declare class ProcessCourseDto {
    tenant: TenantEntity;
    currentAcademicYear: AcademicYearEntity;
    course: CanvasCourseDto;
    assignments: CanvasAssignmentDto[];
    teachers: CanvasUserDto[];
    students: CanvasUserDto[];
}
export declare class ProcessErrorDto {
    domain: string;
    event: any;
    error: Error;
}
export declare class ProcessSubmissionDto {
    tenant: TenantEntity;
    currentAcademicYear: AcademicYearEntity;
    assignment: CanvasAssignmentDto;
    course: CanvasCourseDto;
    teachers: CanvasUserDto[];
    user: CanvasUserDto;
    submission: CanvasSubmissionDto;
}
export declare class ProcessEnrollmentDto {
    tenant: TenantEntity;
    currentAcademicYear: AcademicYearEntity;
    students: CanvasUserDto[];
    course: CanvasCourseDto;
    teachers: CanvasUserDto[];
    assignments: CanvasAssignmentDto[];
}
