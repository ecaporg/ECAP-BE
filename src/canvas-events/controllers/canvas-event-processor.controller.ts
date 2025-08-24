import { Body, Controller, Logger, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CanvasDomain } from '../decorators/canvas-domain.decorator';
import { CanvasEventDto } from '../dto';
import { CanvasEventProcessorService } from '../services/canvas-event-processor.service';
import { url } from 'inspector';

@ApiTags('Canvas Event Processor')
@Controller('canvas-events')
export class CanvasEventProcessorController {
  private readonly logger = new Logger(CanvasEventProcessorController.name);

  constructor(
    private readonly canvasEventProcessorService: CanvasEventProcessorService,
  ) {}

  @Post('webhook')
  processCanvasWebhook(
    @Body() event: CanvasEventDto,
    @CanvasDomain() domain: string,
    @Req() request: Request,
  ) {
    this.logger.log(
      `Processing canvas webhook for domain: ${domain}`,
      JSON.stringify(
        {
          headers: request.headers,
          body: event,
          url: request.url,
        },
        null,
        2,
      ),
    );
    return this.canvasEventProcessorService.processCanvasEvent(event, domain);
  }
}
