"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const TypeOrmTestingModule = (entities) => [
    config_1.ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
    }),
    typeorm_1.TypeOrmModule.forRootAsync({
        imports: [config_1.ConfigModule],
        useFactory: (configService) => {
            return {
                type: 'postgres',
                autoLoadEntities: true,
                url: configService.get('POSTGRES_TEST_URL'),
                synchronize: true,
                dropSchema: true,
                entities: entities,
            };
        },
        inject: [config_1.ConfigService],
    }),
    typeorm_1.TypeOrmModule.forFeature(entities),
];
const loadFixtures = async (dataSource, fixtures) => {
    const entityManager = dataSource.createEntityManager();
    for (const { entity, data } of Object.values(fixtures)) {
        await entityManager.insert(entity, data);
    }
};
const clearFixtures = async (dataSource) => {
    const entityManager = dataSource.createEntityManager();
    const connection = entityManager.connection;
    try {
        const entities = connection.entityMetadatas;
        const tableNames = entities
            .map((entity) => `"${entity.tableName}"`)
            .join(', ');
        await connection.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE`);
    }
    catch (error) {
        throw new Error(`ERROR: Cleaning test database: ${error}`);
    }
};
const closeConn = async (dataSource) => {
    await dataSource.createEntityManager().connection.destroy();
};
exports.default = {
    TypeOrmTestingModule,
    loadFixtures,
    clearFixtures,
    closeConn,
};
//# sourceMappingURL=db-testing.utils.js.map