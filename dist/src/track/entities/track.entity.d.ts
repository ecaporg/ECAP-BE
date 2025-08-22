import { GenericEntity } from 'src/core';
import { StudentLPEnrollmentEntity } from 'src/enrollment/entities/student-enrollment.entity';
import { TenantEntity } from 'src/tenant/entities/tenant.entity';
import { AcademicYearEntity } from './academic-year.entity';
import { SemesterEntity } from './semester.entity';
import { SubjectEntity } from './subject.entity';
import { TrackCalendarEntity } from './track-calendar.entity';
import { TrackLearningPeriodEntity } from './track-learning-period.entity';
export declare class TrackEntity extends GenericEntity {
    tenant_id: number;
    name: string;
    start_date: Date;
    end_date: Date;
    academic_year_id: number;
    tenant: TenantEntity;
    academicYear: AcademicYearEntity;
    calendar: TrackCalendarEntity;
    subjects: SubjectEntity[];
    learningPeriods: TrackLearningPeriodEntity[];
    studentLPEnrollments: StudentLPEnrollmentEntity[];
    semesters: SemesterEntity[];
}
