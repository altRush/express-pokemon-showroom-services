import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes/index';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(routes);

app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
});
