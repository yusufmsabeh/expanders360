import { DataSource } from 'typeorm';
import envConfig from '../config/env.config';
import { User } from '../user/user.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: (envConfig().database.type ?? 'mysql') as 'mysql',
        host: envConfig().database.host,
        port: parseInt(envConfig().database.port ?? '3306'),
        username: envConfig().database.username,
        password: envConfig().database.password,
        database: envConfig().database.database,
        entities: [User],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
