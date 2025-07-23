import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const postgresUrl = process.env.POSTGRES_URL;

// Перевірка наявності URL
if (!postgresUrl) {
  console.error('POSTGRES_URL is not defined in environment variables');
  process.exit(1);
}

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: postgresUrl,
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  ssl: true,
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
  migrationsTransactionMode: 'each',
  logging: process.env.NODE_ENV !== 'production',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
