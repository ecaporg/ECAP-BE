"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const dotenv = require("dotenv");
const typeorm_1 = require("typeorm");
dotenv.config();
const postgresUrl = process.env.POSTGRES_URL;
if (!postgresUrl) {
    console.error('POSTGRES_URL is not defined in environment variables');
    process.exit(1);
}
exports.dataSourceOptions = {
    type: 'postgres',
    url: postgresUrl,
    entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    synchronize: false,
    logging: process.env.NODE_ENV !== 'production',
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=typeorm.config.js.map