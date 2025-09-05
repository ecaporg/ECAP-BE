// import { Body, Controller, Logger, Post } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';

// import { CanvasDomain } from '../decorators/canvas-domain.decorator';
// import { CanvasEventDto } from '../dto';
// import { CanvasEventProcessorService } from '../services/canvas-event-processor.service';

// @ApiTags('Canvas Event Processor')
// @Controller('canvas-events')
// export class CanvasEventProcessorController {
//   private readonly logger = new Logger(CanvasEventProcessorController.name);

//   constructor(
//     private readonly canvasEventProcessorService: CanvasEventProcessorService,
//   ) {}

//   @Post('webhook')
//   processCanvasWebhook(
//     @Body() event: CanvasEventDto,
//     @CanvasDomain() domain: string,
//   ) {
//     this.logger.log(
//       `Processing canvas webhook for domain: ${domain}`,
//       JSON.stringify(
//         {
//           body: event,
//           domain: domain,
//         },
//         null,
//         2,
//       ),
//     );
//     return this.canvasEventProcessorService.processCanvasEvent(event, domain);
//   }
// }
