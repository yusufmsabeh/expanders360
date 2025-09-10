import { DataSource } from 'typeorm';
import process from 'node:process';
import entities from './entity.config';

const dataSource = new DataSource({
  type: (process.env.DATABASE_TYPE ?? 'mysql') as 'mysql',
  host: process.env.MYSQL_HOST ?? 'localhost',
  port: parseInt(process.env.MYSQL_PORT ?? '3306'),
  username: process.env.MYSQL_USER ?? 'root',
  password: process.env.MYSQL_ROOT_PASSWORD ?? 'root',
  database: process.env.MYSQL_DATABASE ?? 'expanders360',
  entities: [...entities],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: false,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export default dataSource;
