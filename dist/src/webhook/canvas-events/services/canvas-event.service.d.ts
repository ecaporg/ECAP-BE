import { CanvasAssignmentEventDto, CanvasCourseEventDto, CanvasEnrollmentEventDto, CanvasSubmissionEventDto } from '../dto';
import { CanvasProcessorService } from './canvas-processor.service';
import { CanvasResourcesService } from './canvas-resources.service';
export declare class CanvasEventService {
    private readonly processor;
    private readonly resources;
    constructor(processor: CanvasProcessorService, resources: CanvasResourcesService);
    processCourseEvent(event: CanvasCourseEventDto, domain: string): Promise<void>;
    processAssignmentEvent(event: CanvasAssignmentEventDto, domain: string): Promise<void>;
    processSubmissionEvent(event: CanvasSubmissionEventDto, domain: string): Promise<void>;
    processEnrollmentEvent(event: CanvasEnrollmentEventDto, domain: string): Promise<void>;
}
