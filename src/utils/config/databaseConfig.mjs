import { DataSource } from 'typeorm';
import postSchema from '../database/entitities/postEntity.mjs';

import dotenv from 'dotenv';
dotenv.config();

const dataSourceConfig = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [postSchema],
  // synchronize: true, // Not recommend, but its a test so we keep
});


export default dataSourceConfig;