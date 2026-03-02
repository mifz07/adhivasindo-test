import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

const isCompiled = __dirname.includes('dist');

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: process.env.DB_SCHEMA || 'develop',
    entities: [
        isCompiled ? 'dist/**/*.entity.js' : 'src/**/*.entity.ts'
    ],
    migrations: [
        isCompiled ? 'dist/db/migrations/*.js' : 'src/db/migrations/*.ts'
    ],
    migrationsTableName: 'migrations',
    synchronize: true,
    logging: true,
    extra: {
        connectionLimit: 10,
    },
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
