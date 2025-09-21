import { HttpService } from '@nestjs/axios';
import { KeyEntity } from '../../../domain/tenant/entities/key.entity';
import { CanvasAssignmentDto, CanvasCourseDto, CanvasEnrollmentDto, CanvasSubmissionDto, CanvasUserDto } from '../dto';
export declare class CanvasResourcesService {
    private readonly httpService;
    constructor(httpService: HttpService);
    private getHeaders;
    fetchAssignment(key: KeyEntity, courseId: string | number, assignmentId: string | number): Promise<CanvasAssignmentDto>;
    fetchCourse(key: KeyEntity, courseId: string | number): Promise<CanvasCourseDto>;
    fetchAssignmentsInCourse(key: KeyEntity, courseId: string | number): Promise<CanvasAssignmentDto[]>;
    fetchTeachersInCourse(key: KeyEntity, courseId: string | number): Promise<CanvasUserDto[]>;
    fetchStudentsInCourse(key: KeyEntity, courseId: string | number): Promise<CanvasUserDto[]>;
    fetchSubmission(key: KeyEntity, courseId: string | number, assignmentId: string | number, userId: string | number): Promise<CanvasSubmissionDto>;
    fetchEnrollment(key: KeyEntity, accountId: string | number, enrollmentId: string | number): Promise<CanvasEnrollmentDto>;
    fetchUsersInAccount(key: KeyEntity, accountId: string | number, userId: string): Promise<CanvasUserDto[]>;
}
