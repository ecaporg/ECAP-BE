import { ITenant } from 'ecap-lib/dist/domain';
import { Relation } from 'typeorm';
import { IDGenericEntity } from '../../../core';
import { AcademyEntity } from '../../school/entities/academy.entity';
import { SchoolEntity } from '../../school/entities/school.entity';
import { AdminEntity, DirectorEntity, TeacherEntity } from '../../staff/entities/staff.entity';
import { CourseEntity } from '../../subject/entities/course.entity';
import { TrackEntity } from '../../track/entities/track.entity';
import { KeyEntity } from './key.entity';
export declare class TenantEntity extends IDGenericEntity implements ITenant {
    name: string;
    schools: Relation<SchoolEntity[]>;
    admins: Relation<AdminEntity[]>;
    teachers: Relation<TeacherEntity[]>;
    academies: Relation<AcademyEntity[]>;
    tracks: Relation<TrackEntity[]>;
    directors: Relation<DirectorEntity[]>;
    key: Relation<KeyEntity>;
    courses: Relation<CourseEntity[]>;
}
