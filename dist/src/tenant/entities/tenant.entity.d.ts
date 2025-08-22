import { GenericEntity } from 'src/core';
import { AcademyEntity } from 'src/school/entities/academy.entity';
import { SchoolEntity } from 'src/school/entities/school.entity';
import { AdminEntity, DirectorEntity } from 'src/staff/entities/staff.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { ErrorEntity } from './error.entity';
import { KeyEntity } from './key.entity';
export declare class TenantEntity extends GenericEntity {
    name: string;
    root_id: number;
    schools: SchoolEntity[];
    admins: AdminEntity[];
    academies: AcademyEntity[];
    tracks: TrackEntity[];
    directors: DirectorEntity[];
    errors: ErrorEntity[];
    key: KeyEntity;
}
