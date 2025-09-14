/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Injectable } from '@nestjs/common';

import { BadRequestException } from '../../../core';
import {
  CanvasAssignmentEventDto,
  CanvasCourseEventDto,
  CanvasEnrollmentEventDto,
  CanvasSubmissionEventDto,
} from '../dto';

import { CanvasProcessorService } from './canvas-processor.service';
import { CanvasResourcesService } from './canvas-resources.service';

@Injectable()
export class CanvasEventService {
  constructor(
    private readonly processor: CanvasProcessorService,
    private readonly resources: CanvasResourcesService,
  ) {}

  async processCourseEvent(event: CanvasCourseEventDto, domain: string) {
    if (event.body.workflow_state === 'available') {
      const { tenant, currentAcademicYear } =
        await this.processor.findTenantByDomain(domain);
      try {
        const course = await this.resources.fetchCourse(
          tenant.key,
          event.body.course_id,
        );
        const [assignments, teachers, students] = await Promise.all([
          this.resources.fetchAssignmentsInCourse(tenant.key, course.id),
          this.resources.fetchTeachersInCourse(tenant.key, course.id),
          this.resources.fetchStudentsInCourse(tenant.key, course.id),
        ]);
        await this.processor.updateCourse({
          tenant,
          currentAcademicYear,
          course,
          assignments,
          teachers,
          students,
        });

        // Log error
      } catch (error) {
        this.processor.logError({ tenant, domain, event, error });
      }
    }
  }

  async processAssignmentEvent(
    event: CanvasAssignmentEventDto,
    domain: string,
  ) {
    const { tenant } = await this.processor.findTenantByDomain(domain);
    try {
      const assignment = await this.resources.fetchAssignment(
        tenant.key,
        event.metadata.context_id,
        event.body.assignment_id,
      );
      await this.processor.updateAssignment(tenant, assignment);

      // Log error
    } catch (error) {
      this.processor.logError({ tenant, domain, event, error });
    }
  }

  async processSubmissionEvent(
    event: CanvasSubmissionEventDto,
    domain: string,
  ) {
    const { tenant, currentAcademicYear } =
      await this.processor.findTenantByDomain(domain);

    try {
      const [assignment, course, submission, teachers, [user]] =
        await Promise.all([
          this.resources.fetchAssignment(
            tenant.key,
            event.metadata.context_id,
            event.body.assignment_id,
          ),
          this.resources.fetchCourse(tenant.key, event.metadata.context_id),
          this.resources.fetchSubmission(
            tenant.key,
            event.metadata.context_id,
            event.body.assignment_id,
            event.body.user_id,
          ),
          this.resources.fetchTeachersInCourse(
            tenant.key,
            event.metadata.context_id,
          ),
          this.resources.fetchUsersInAccount(
            tenant.key,
            event.metadata.user_account_id,
            event.body.user_id,
          ),
        ]);

      await this.processor.updateSubmission({
        tenant,
        currentAcademicYear,
        assignment,
        course,
        teachers,
        user,
        submission,
      });

      // Log error
    } catch (error) {
      this.processor.logError({ tenant, domain, event, error });
    }
  }

  async processEnrollmentEvent(
    event: CanvasEnrollmentEventDto,
    domain: string,
  ) {
    if (
      event.body.type === 'StudentEnrollment' &&
      event.body.workflow_state === 'active'
    ) {
      const { tenant, currentAcademicYear } =
        await this.processor.findTenantByDomain(domain);
      try {
        const [students, course, teachers, assignments] = await Promise.all([
          this.resources.fetchUsersInAccount(
            tenant.key,
            event.metadata.user_account_id,
            event.body.user_id,
          ),
          this.resources.fetchCourse(tenant.key, event.body.course_id),
          this.resources.fetchTeachersInCourse(
            tenant.key,
            event.body.course_id,
          ),
          this.resources.fetchAssignmentsInCourse(
            tenant.key,
            event.body.course_id,
          ),
        ]);

        await this.processor.processEnrollmentCreated({
          tenant,
          currentAcademicYear,
          students,
          course,
          teachers,
          assignments,
        });
      } catch (error) {
        this.processor.logError({ tenant, domain, event, error });
      }
    }
  }
}
