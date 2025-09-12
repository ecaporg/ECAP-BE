import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CanvasCourseEventDto } from '../dto';
import { CanvasEventService } from '../services/canvas-event.service';

@ApiTags('Canvas Event Processor')
@Controller('canvas-events/:domain')
export class CanvasEventController {
  constructor(private readonly canvasEventService: CanvasEventService) {}

  @Post('course')
  courseEvent(
    @Body() event: CanvasCourseEventDto,
    @Param('domain') domain: string,
  ) {
    return this.canvasEventService.processCourseEvent(event, domain);
  }

  @Post('assignment')
  assignmentEvent(@Body() event: any, @Param('domain') domain: string) {
    return this.canvasEventService.processAssignmentEvent(event, domain);
  }

  @Post('submission')
  submissionEvent(@Body() event: any, @Param('domain') domain: string) {
    return this.canvasEventService.processSubmissionEvent(event, domain);
  }
}
