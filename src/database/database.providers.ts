import { DataSource } from 'typeorm';
import { Client } from '../client/client.entity';
import { Admin } from '../admin/admin.entity';

console.log(__dirname);

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'sys',
        entities: [Client, Admin],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
