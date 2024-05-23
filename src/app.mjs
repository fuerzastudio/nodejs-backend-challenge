import express from 'express';
import router from './routes/api/index.mjs';
import dataSourceConfig from './config/databaseConfig.mjs';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './utils/swagger-output.json' assert { type: "json" };

const app = express();
app.use(express.json());
app.use(router)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile))
const PORT = process.env.PORT || 3000;

dataSourceConfig.initialize().then(() => console.log('Connected to DB succesfully!'));

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
