import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { KeyEntity } from 'src/tenant/entities/key.entity';
import { CanvasAssignmentDto, CanvasCourseDto, CanvasEnrollmentDto, CanvasSubmissionDto, CanvasUserDto } from '../dto';
export declare class CanvasResourcesService {
    private readonly httpService;
    constructor(httpService: HttpService);
    private getHeaders;
    fetchAssignment(key: KeyEntity, courseId: string | number, assignmentId: string | number): Observable<CanvasAssignmentDto>;
    fetchCourse(key: KeyEntity, courseId: string | number): Observable<CanvasCourseDto>;
    fetchEnrollment(key: KeyEntity, accountId: string | number, enrollmentId: string | number): Observable<CanvasEnrollmentDto>;
    fetchTeachersInCourse(key: KeyEntity, courseId: string | number): Observable<CanvasUserDto[]>;
    fetchUsersInAccount(key: KeyEntity, accountId: string | number, userId: string): Observable<CanvasUserDto[]>;
    fetchSubmission(key: KeyEntity, courseId: string | number, assignmentId: string | number, userId: string | number): Observable<CanvasSubmissionDto>;
}
