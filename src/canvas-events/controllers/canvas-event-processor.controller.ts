import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CanvasDomain } from '../decorators/canvas-domain.decorator';
import { CanvasEventDto } from '../dto';
import { CanvasEventProcessorService } from '../services/canvas-event-processor.service';

@ApiTags('Canvas Event Processor')
@Controller('canvas-events')
export class CanvasEventProcessorController {
  constructor(
    private readonly canvasEventProcessorService: CanvasEventProcessorService,
  ) {}

  @Post('webhook')
  processCanvasWebhook(
    @Body() event: CanvasEventDto,
    @CanvasDomain() domain: string,
  ) {
    return this.canvasEventProcessorService.processCanvasEvent(event, domain);
  }
}
