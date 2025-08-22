import { AcademyEntity } from '../entities/academy.entity';
interface Academy extends AcademyEntity {
}
export declare class CreateAcademyDto implements Pick<Academy, 'name'> {
    name: string;
    tenant_id?: number;
}
declare const UpdateAcademyDto_base: import("@nestjs/common").Type<Partial<CreateAcademyDto>>;
export declare class UpdateAcademyDto extends UpdateAcademyDto_base {
}
export {};
