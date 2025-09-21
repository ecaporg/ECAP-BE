import { IStudent } from 'ecap-lib/dist/domain';
import { Relation } from 'typeorm';
import { UserEntity } from '../../../auth/entities/user.entity';
import { IDIntGenericEntity } from '../../../core';
import { StudentLPEnrollmentEntity } from '../../enrollment/entities/student-enrollment.entity';
import { AcademyEntity } from '../../school/entities/academy.entity';
import { SchoolEntity } from '../../school/entities/school.entity';
export declare class StudentEntity extends IDIntGenericEntity implements IStudent {
    id: number;
    school_id: number;
    academy_id: number;
    school: Relation<SchoolEntity>;
    user: Relation<UserEntity>;
    academy: Relation<AcademyEntity>;
    student_lp_enrollments: Relation<StudentLPEnrollmentEntity[]>;
}
