import { CanvasEventService } from '../services/canvas-event.service';
export declare class CanvasEventController {
    private readonly service;
    private readonly logger;
    constructor(service: CanvasEventService);
    courseEvent(event: any, domain: string): Promise<void>;
    assignmentEvent(event: any, domain: string): Promise<void>;
    submissionEvent(event: any, domain: string): Promise<void>;
    enrolmentEvent(event: any, domain: string): Promise<void>;
}
