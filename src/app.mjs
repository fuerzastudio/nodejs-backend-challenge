import express from 'express';
import router from './routes/api/index.mjs';

const app = express();
app.use(router)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));