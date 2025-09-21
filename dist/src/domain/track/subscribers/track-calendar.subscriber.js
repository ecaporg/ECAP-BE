"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TrackCalendarSubscriber_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackCalendarSubscriber = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const track_entity_1 = require("../entities/track.entity");
const track_calendar_entity_1 = require("../entities/track-calendar.entity");
let TrackCalendarSubscriber = TrackCalendarSubscriber_1 = class TrackCalendarSubscriber {
    constructor() {
        this.logger = new common_1.Logger(TrackCalendarSubscriber_1.name);
    }
    listenTo() {
        return track_entity_1.TrackEntity;
    }
    async afterInsert(event) {
        this.logger.log(`Detected insert for Track with id: ${event.entity?.id}`);
        if (event.entity) {
            this.logger.log(`Creating TrackCalendar for Track id: ${event.entity.id}`);
            await this.createTrackCalendar(event.entity.id, event.queryRunner);
        }
    }
    async createTrackCalendar(trackId, queryRunner) {
        const startedTransaction = !queryRunner.isTransactionActive;
        if (startedTransaction) {
            await queryRunner.connect();
            await queryRunner.startTransaction();
        }
        try {
            await queryRunner.manager.save(track_calendar_entity_1.TrackCalendarEntity, {
                id: trackId,
                days: [],
            });
            if (startedTransaction) {
                await queryRunner.commitTransaction();
            }
        }
        catch (error) {
            if (startedTransaction) {
                await queryRunner.rollbackTransaction();
            }
            this.logger.error(error);
        }
        finally {
            if (startedTransaction) {
                await queryRunner.release();
            }
        }
    }
};
exports.TrackCalendarSubscriber = TrackCalendarSubscriber;
exports.TrackCalendarSubscriber = TrackCalendarSubscriber = TrackCalendarSubscriber_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EventSubscriber)()
], TrackCalendarSubscriber);
//# sourceMappingURL=track-calendar.subscriber.js.map