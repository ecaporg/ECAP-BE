/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Injectable } from '@nestjs/common';

import { BadRequestException } from '../../../core';
import {
  CanvasAssignmentEventDto,
  CanvasCourseEventDto,
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
    if (typeof event.body.published === 'boolean' && event.body.published) {
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
    const course_id = event.metadata.url.match(
      /courses\/(\d+)\/assignments\/(\d+)/,
    )?.[1];
    try {
      const assignment = await this.resources.fetchAssignment(
        tenant.key,
        course_id,
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

  //   async processCanvasEvent(event: CanvasEventDto, domain: string | null) {
  //     const { tenant, currentAcademicYear } =
  //       await this.findTenantByDomain(domain);

  //     try {
  //       await this.handleEventByType(event, tenant, currentAcademicYear);
  //     } catch (error) {
  //       this.errorService.create({
  //         tenant,
  //         message: `Error processing canvas event: domain ${domain}, error: ${error.message}, event: ${JSON.stringify(event)}`,
  //       });
  //       throw error;
  //     }
  //   }

  //   private async handleEventByType(
  //     event: CanvasEventDto,
  //     tenant: TenantEntity,
  //     currentAcademicYear: AcademicYearEntity,
  //   ): Promise<void> {
  //     switch (event.metadata.event_name) {
  //       case CanvasEventType.SUBMISSION_CREATED:
  //         await this.handleSubmissionCreated(
  //           event as CanvasSubmissionCreatedEventDto,
  //           tenant,
  //           currentAcademicYear,
  //         );
  //         break;

  //       case CanvasEventType.SUBMISSION_UPDATED:
  //         await this.handleSubmissionUpdated(
  //           event as CanvasSubmissionUpdatedEventDto,
  //           tenant,
  //         );
  //         break;
  //     }
  //   }

  //   private async handleSubmissionCreated(
  //     event: CanvasSubmissionCreatedEventDto,
  //     tenant: TenantEntity,
  //     currentAcademicYear: AcademicYearEntity,
  //   ): Promise<void> {
  //     const { assignment, course, teachers, user, submission } =
  //       await this.getAllData(event, tenant.key);

  //     const teacher_enrolemts = await this.getOrCreateTeachersEnrolemts(
  //       teachers,
  //       tenant,
  //       currentAcademicYear,
  //     );

  //     const student = await this.getOrCreateStudent(user[0], tenant);

  //     const subjects = await this.findSubjectWithLearningPeriod(
  //       assignment,
  //       course,
  //       tenant.tracks,
  //       student,
  //     );

  //     const student_enrolemts = await this.getOrCreateStudentEnrolemts(
  //       student,
  //       subjects.flatMap((subject) => subject.track.learningPeriods),
  //       teacher_enrolemts,
  //     );

  //     await this.createSamples(
  //       student_enrolemts,
  //       subjects,
  //       assignment,
  //       submission,
  //       teacher_enrolemts[0].teacher,
  //     );
  //   }

  //   private async handleSubmissionUpdated(
  //     event: CanvasSubmissionUpdatedEventDto,
  //     tenant: TenantEntity,
  //   ): Promise<void> {
  //     const { submission, assignment, teachers } = await this.getAllData(
  //       event,
  //       tenant.key,
  //     );

  //     await this.updateSample(submission, assignment, teachers);
  //   }
}
