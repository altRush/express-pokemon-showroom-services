import express, { Application } from 'express';
import dotenv from 'dotenv';
import routes from './routes/index';
import bodyParser from 'body-parser';
import { authenticateToken } from './middlewares';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(authenticateToken);
app.use(routes);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
