import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import connection from './config/connectdb';
import initAPIRouter from './routers/api';
import task from './controllers/schedulePromotions';
dotenv.config();

// task.start();
const app = express();
app.use(cors({ credentials: true, origin: true }));
const port = process.env.PORT || 6969;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// setup router

initAPIRouter(app);
connection();

app.listen(port, () => {
  return console.log('server running on port: ', port);
});
