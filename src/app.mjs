import express from 'express';
import router from './routes/api/index.mjs';
import dataSourceConfig from './config/databaseConfig.mjs';

const app = express();
app.use(router)
const PORT = process.env.PORT || 3000;

dataSourceConfig.initialize().then(() => console.log('Connected to DB succesfully!'));

app.listen(PORT, () => console.log(`Running on port ${PORT}`));