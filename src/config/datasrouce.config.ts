import { DataSource } from 'typeorm';
import process from 'node:process';
import entities from './entity.config';

const dataSource = new DataSource({
  type: (process.env.DATABASE_TYPE ?? 'mysql') as 'mysql',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: parseInt(process.env.DATABASE_PORT ?? '3306'),
  username: process.env.DATABASE_USERNAME ?? 'root',
  password: process.env.DATABASE_PASSWORD ?? 'root',
  database: process.env.DATABASE_NAME ?? 'expanders360',
  entities: [...entities],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: false,
});

export default dataSource;
