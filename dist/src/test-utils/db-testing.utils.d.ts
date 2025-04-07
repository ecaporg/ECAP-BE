import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';
interface IFixture {
    entity: EntityTarget<ObjectLiteral>;
    data: Record<string, unknown>[];
}
declare const _default: {
    TypeOrmTestingModule: (entities: any[]) => (import("@nestjs/common").DynamicModule | Promise<import("@nestjs/common").DynamicModule>)[];
    loadFixtures: (dataSource: DataSource, fixtures: Record<string, IFixture>) => Promise<void>;
    clearFixtures: (dataSource: DataSource) => Promise<void>;
    closeConn: (dataSource: DataSource) => Promise<void>;
};
export default _default;
