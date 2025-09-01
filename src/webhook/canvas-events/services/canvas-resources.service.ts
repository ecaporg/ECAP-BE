import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { KeyEntity } from '../../../domain/tenant/entities/key.entity';
import {
  CanvasAssignmentDto,
  CanvasCourseDto,
  CanvasEnrollmentDto,
  CanvasSubmissionDto,
  CanvasUserDto,
} from '../dto';

@Injectable()
export class CanvasResourcesService {
  constructor(private readonly httpService: HttpService) {}

  private getHeaders({ access_token }: KeyEntity) {
    return {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Fetch assignment details
   * @param courseId - Course ID
   * @param assignmentId - Assignment ID
   * @param include - Optional includes (submission, assignment_visibility, overrides, etc.)
   */
  fetchAssignment(
    key: KeyEntity,
    courseId: string | number,
    assignmentId: string | number,
  ): Observable<CanvasAssignmentDto> {
    const url = `${key.url}/api/v1/courses/${courseId}/assignments/${assignmentId}`;

    return this.httpService
      .get<CanvasAssignmentDto>(url, {
        headers: this.getHeaders(key),
      })
      .pipe(
        map((response: AxiosResponse<CanvasAssignmentDto>) => response.data),
      );
  }

  /**
   * Fetch course details
   * @param courseId - Course ID
   */
  fetchCourse(
    key: KeyEntity,
    courseId: string | number,
  ): Observable<CanvasCourseDto> {
    const url = `${key.url}/api/v1/courses/${courseId}`;

    return this.httpService
      .get<CanvasCourseDto>(url, {
        headers: this.getHeaders(key),
      })
      .pipe(map((response: AxiosResponse<CanvasCourseDto>) => response.data));
  }

  /**
   * Fetch enrollment details
   * @param accountId - Account ID
   * @param enrollmentId - Enrollment ID
   */
  fetchEnrollment(
    key: KeyEntity,
    accountId: string | number,
    enrollmentId: string | number,
  ): Observable<CanvasEnrollmentDto> {
    const url = `${key.url}/api/v1/accounts/${accountId}/enrollments/${enrollmentId}`;

    return this.httpService
      .get<CanvasEnrollmentDto>(url, {
        headers: this.getHeaders(key),
      })
      .pipe(
        map((response: AxiosResponse<CanvasEnrollmentDto>) => response.data),
      );
  }

  fetchTeachersInCourse(
    key: KeyEntity,
    courseId: string | number,
  ): Observable<CanvasUserDto[]> {
    const url = `${key.url}/api/v1/courses/${courseId}/users`;
    const params = {
      enrollment_type: 'teacher',
    };

    return this.httpService
      .get<CanvasUserDto[]>(url, {
        headers: this.getHeaders(key),
        params,
      })
      .pipe(map((response: AxiosResponse<CanvasUserDto[]>) => response.data));
  }

  fetchUsersInAccount(
    key: KeyEntity,
    accountId: string | number,
    userId: string,
  ): Observable<CanvasUserDto[]> {
    const url = `${key.url}/api/v1/accounts/${accountId}/users`;
    const params = {
      search_term: userId,
    };

    return this.httpService
      .get<CanvasUserDto[]>(url, {
        headers: this.getHeaders(key),
        params,
      })
      .pipe(map((response: AxiosResponse<CanvasUserDto[]>) => response.data));
  }

  /**
   * Fetch submission details
   * @param courseId - Course ID
   * @param assignmentId - Assignment ID
   * @param userId - User ID
   */
  fetchSubmission(
    key: KeyEntity,
    courseId: string | number,
    assignmentId: string | number,
    userId: string | number,
  ): Observable<CanvasSubmissionDto> {
    const url = `${key.url}/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions/${userId}`;

    return this.httpService
      .get<CanvasSubmissionDto>(url, {
        headers: this.getHeaders(key),
      })
      .pipe(
        map((response: AxiosResponse<CanvasSubmissionDto>) => response.data),
      );
  }
}
