import { firstValueFrom } from 'rxjs';

import { Injectable, NotFoundException } from '@nestjs/common';

import { KeyEntity } from '@/tenant/entities/key.entity';
import { TenantEntity } from '@/tenant/entities/tenant.entity';
import { TenantService } from '@/tenant/services/tenant.service';

import {
  CanvasEventDto,
  CanvasEventType,
  CanvasSubmissionCreatedEventDto,
  CanvasSubmissionUpdatedEventDto,
} from '../dto';

import { CanvasResourcesService } from './canvas-resources.service';

@Injectable()
export class CanvasEventProcessorService {
  constructor(
    private readonly tenantService: TenantService,
    private readonly canvasResourcesService: CanvasResourcesService,
  ) {}

  async processCanvasEvent(event: CanvasEventDto): Promise<void> {
    const tenant = await this.findTenantByRootAccountId(
      event.metadata.root_account_id,
    );

    await this.handleEventByType(event, tenant.key);
  }

  private async handleEventByType(
    event: CanvasEventDto,
    canvasKey: KeyEntity,
  ): Promise<void> {
    switch (event.metadata.event_name) {
      case CanvasEventType.SUBMISSION_CREATED:
        await this.handleSubmissionCreated(
          event as CanvasSubmissionCreatedEventDto,
          canvasKey,
        );
        break;

      case CanvasEventType.SUBMISSION_UPDATED:
        await this.handleSubmissionUpdated(
          event as CanvasSubmissionUpdatedEventDto,
          canvasKey,
        );
        break;
    }
  }

  private async handleSubmissionCreated(
    event: CanvasSubmissionCreatedEventDto,
    canvasKey: KeyEntity,
  ): Promise<void> {
    const enrollment = await firstValueFrom(
      this.canvasResourcesService.fetchEnrollment(
        canvasKey,
        event.metadata.user_account_id,
        event.metadata.context_id,
      ),
    );

    const assignment = await firstValueFrom(
      this.canvasResourcesService.fetchAssignment(
        canvasKey,
        enrollment.course_id,
        event.body.assignment_id,
      ),
    );

    const teachers = await firstValueFrom(
      this.canvasResourcesService.fetchTeachersInCourse(
        canvasKey,
        enrollment.course_id,
      ),
    );
  }

  private async handleSubmissionUpdated(
    event: CanvasSubmissionUpdatedEventDto,
    canvasKey: KeyEntity,
  ): Promise<void> {}

  private async findTenantByRootAccountId(
    rootAccountId: string,
  ): Promise<TenantEntity> {
    return this.tenantService.findOneBy(
      {
        root_id: rootAccountId,
      } as any,
      {
        key: true,
      },
    );
  }
}
