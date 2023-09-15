import express from 'express';
import homeRouter from './routes/home';
import aboutRouter from './routes/about';

export const app = express();

app.use('/home', homeRouter);
app.use('/about', aboutRouter);

``