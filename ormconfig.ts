import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();

console.log(process.env.DATABASE_HOST);

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'test',
  database: 'nest_practice_db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/**/migrations/*{.ts, .js}'],
  migrationsTableName: 'migrations',
});
