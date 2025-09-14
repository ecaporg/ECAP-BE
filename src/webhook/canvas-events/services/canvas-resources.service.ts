import { AxiosResponse } from 'axios';
import { firstValueFrom, map } from 'rxjs';

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
  ): Promise<CanvasAssignmentDto> {
    const url = `${key.url}/api/v1/courses/${courseId}/assignments/${assignmentId}`;

    return firstValueFrom(
      this.httpService
        .get<CanvasAssignmentDto>(url, {
          headers: this.getHeaders(key),
        })
        .pipe(
          map((response: AxiosResponse<CanvasAssignmentDto>) => response.data),
        ),
    );
  }

  /**
   * Fetch course details
   * @param courseId - Course ID
   */
  async fetchCourse(
    key: KeyEntity,
    courseId: string | number,
  ): Promise<CanvasCourseDto> {
    const url = `${key.url}/api/v1/courses/${courseId}`;

    return firstValueFrom(
      this.httpService
        .get<CanvasCourseDto>(url, {
          headers: this.getHeaders(key),
        })
        .pipe(map((response: AxiosResponse<CanvasCourseDto>) => response.data)),
    );
  }

  /**
   * Fetch assignments in a course
   * @param courseId - Course ID
   */
  async fetchAssignmentsInCourse(
    key: KeyEntity,
    courseId: string | number,
  ): Promise<CanvasAssignmentDto[]> {
    const url = `${key.url}/api/v1/courses/${courseId}/assignment_groups?exclude_assignment_submission_types%5B%5D=wiki_page&exclude_response_fields%5B%5D=description&exclude_response_fields%5B%5D=rubric&include%5B%5D=assignments&include%5B%5D=discussion_topic&include%5B%5D=all_dates&include%5B%5D=module_ids&override_assignment_dates=false&per_page=50`;

    return firstValueFrom(
      this.httpService
        .get<{ assignments: CanvasAssignmentDto[] }[]>(url, {
          headers: this.getHeaders(key),
        })
        .pipe(
          map(
            (
              response: AxiosResponse<{ assignments: CanvasAssignmentDto[] }[]>,
            ) => response.data,
          ),
          map((data: { assignments: CanvasAssignmentDto[] }[]) =>
            data.flatMap((item) => item.assignments),
          ),
        ),
    );
  }

  fetchTeachersInCourse(
    key: KeyEntity,
    courseId: string | number,
  ): Promise<CanvasUserDto[]> {
    const url = `${key.url}/api/v1/courses/${courseId}/users?include%5B%5D=last_login&include%5B%5D=avatar_url&include%5B%5D=pronouns&include%5B%5D=email&include%5B%5D=time_zone&include%5B%5D=ui_invoked`;
    const params = {
      enrollment_type: 'teacher',
    };

    return firstValueFrom(
      this.httpService
        .get<CanvasUserDto[]>(url, {
          headers: this.getHeaders(key),
          params,
        })
        .pipe(map((response: AxiosResponse<CanvasUserDto[]>) => response.data)),
    );
  }

  fetchStudentsInCourse(
    key: KeyEntity,
    courseId: string | number,
  ): Promise<CanvasUserDto[]> {
    const url = `${key.url}/api/v1/courses/${courseId}/users?include%5B%5D=last_login&include%5B%5D=avatar_url&include%5B%5D=pronouns&include%5B%5D=email&include%5B%5D=time_zone&include%5B%5D=ui_invoked`;
    const params = {
      enrollment_type: 'student',
    };

    return firstValueFrom(
      this.httpService
        .get<CanvasUserDto[]>(url, {
          headers: this.getHeaders(key),
          params,
        })
        .pipe(map((response: AxiosResponse<CanvasUserDto[]>) => response.data)),
    );
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
  ): Promise<CanvasSubmissionDto> {
    const url = `${key.url}/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions/${userId}`;

    return firstValueFrom(
      this.httpService
        .get<CanvasSubmissionDto>(url, {
          headers: this.getHeaders(key),
        })
        .pipe(
          map((response: AxiosResponse<CanvasSubmissionDto>) => response.data),
        ),
    );
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
  ): Promise<CanvasEnrollmentDto> {
    const url = `${key.url}/api/v1/accounts/${accountId}/enrollments/${enrollmentId}`;

    return firstValueFrom(
      this.httpService
        .get<CanvasEnrollmentDto>(url, {
          headers: this.getHeaders(key),
        })
        .pipe(
          map((response: AxiosResponse<CanvasEnrollmentDto>) => response.data),
        ),
    );
  }

  fetchUsersInAccount(
    key: KeyEntity,
    accountId: string | number,
    userId: string,
  ): Promise<CanvasUserDto[]> {
    const url = `${key.url}/api/v1/accounts/${accountId}/users?include%5B%5D=last_login&include%5B%5D=avatar_url&include%5B%5D=pronouns&include%5B%5D=email&include%5B%5D=time_zone&include%5B%5D=ui_invoked`;
    const params = {
      search_term: userId,
    };

    return firstValueFrom(
      this.httpService
        .get<CanvasUserDto[]>(url, {
          headers: this.getHeaders(key),
          params,
        })
        .pipe(map((response: AxiosResponse<CanvasUserDto[]>) => response.data)),
    );
  }
}
