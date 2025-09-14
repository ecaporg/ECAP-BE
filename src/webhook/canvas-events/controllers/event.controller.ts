import { Body, Controller, Logger, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CanvasEventService } from '../services/canvas-event.service';

@ApiTags('Canvas Event Processor')
@Controller('canvas-events/:domain')
export class CanvasEventController {
  private readonly logger = new Logger(CanvasEventController.name);
  constructor(private readonly service: CanvasEventService) {}

  @Post('course')
  courseEvent(
    @Body() event: any, // CanvasCourseEventDto,
    @Param('domain') domain: string,
  ) {
    this.logger.log(
      `Processing course event for domain: ${domain}, event: ${JSON.stringify(event, null, 2)}`,
    );
    return true;
    // return this.service.processCourseEvent(event, domain);
  }

  @Post('assignment')
  assignmentEvent(
    @Body() event: any, // CanvasAssignmentEventDto,
    @Param('domain') domain: string,
  ) {
    this.logger.log(
      `Processing assignment event for domain: ${domain}, event: ${JSON.stringify(event, null, 2)}`,
    );
    return true;
    // return this.service.processAssignmentEvent(event, domain);
  }

  @Post('submission')
  submissionEvent(
    @Body() event: any, //CanvasSubmissionEventDto,
    @Param('domain') domain: string,
  ) {
    this.logger.log(
      `Processing submission event for domain: ${domain}, event: ${JSON.stringify(event, null, 2)}`,
    );
    return this.service.processSubmissionEvent(event, domain);
  }
}
