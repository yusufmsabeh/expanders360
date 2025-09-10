import * as process from 'node:process';

export default () => ({
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  mongodb: {
    uri: process.env.MONGO_URI ?? 'none',
    username: process.env.MONGO_ROOT_USERNAME ?? 'root',
    password: process.env.MONGO_ROOT_PASSWORD ?? 'root',
    port: process.env.MONGO_ROOT_PORT ?? 27017,
  },
  azure: {
    emailString: process.env.AZURE_COMMUNICATION_SERVICES_CONNECTION_STRING,
    email: process.env.AZURE_EMAIL,
  },
});
