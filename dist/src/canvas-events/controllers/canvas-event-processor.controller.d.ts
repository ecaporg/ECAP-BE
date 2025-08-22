import { CanvasEventDto } from '../dto';
import { CanvasEventProcessorService } from '../services/canvas-event-processor.service';
export declare class CanvasEventProcessorController {
    private readonly canvasEventProcessorService;
    constructor(canvasEventProcessorService: CanvasEventProcessorService);
    processCanvasWebhook(event: CanvasEventDto): Promise<void>;
}
