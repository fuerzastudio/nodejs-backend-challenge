import { DataSource } from 'typeorm';
import postSchema from '../database/entitities/postEntity.mjs';

const dataSourceConfig = new DataSource({
  type: 'postgres',
  host: 'dbpostgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [postSchema],
  synchronize: true, // Not recommend, but its a test so we keep
});


export default dataSourceConfig;