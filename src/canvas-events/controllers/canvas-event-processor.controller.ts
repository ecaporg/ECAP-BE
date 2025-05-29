import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CanvasEventDto } from '../dto';
import { CanvasEventProcessorService } from '../services/canvas-event-processor.service';

@ApiTags('Canvas Event Processor')
@Controller('canvas-events')
export class CanvasEventProcessorController {
  private readonly logger = new Logger(CanvasEventProcessorController.name);

  constructor(
    private readonly canvasEventProcessorService: CanvasEventProcessorService,
  ) {}

  @Post('webhook')
  @ApiOperation({ summary: 'Process Canvas webhook events' })
  @ApiResponse({ status: 200, description: 'Event processed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid event data' })
  @ApiResponse({ status: 404, description: 'Tenant or Canvas key not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async processCanvasWebhook(@Body() event: CanvasEventDto): Promise<{
    message: string;
    eventType: string;
    timestamp: string;
  }> {
    try {
      this.logger.log(
        `Received Canvas webhook event: ${event.metadata.event_name}`,
      );

      await this.canvasEventProcessorService.processCanvasEvent(event);

      return {
        message: 'Canvas event processed successfully',
        eventType: event.metadata.event_name,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(
        `Failed to process Canvas webhook: ${error.message}`,
        error.stack,
      );

      if (error.status) {
        throw error;
      }

      throw new HttpException(
        'Failed to process Canvas webhook event',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
