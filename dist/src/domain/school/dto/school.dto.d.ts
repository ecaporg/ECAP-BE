import { SchoolEntity } from '../entities/school.entity';
interface School extends SchoolEntity {
}
export declare class CreateSchoolDto implements Pick<School, 'name'> {
    name: string;
    tenant_id?: number;
}
declare const UpdateSchoolDto_base: import("@nestjs/common").Type<Partial<CreateSchoolDto>>;
export declare class UpdateSchoolDto extends UpdateSchoolDto_base {
}
export {};
