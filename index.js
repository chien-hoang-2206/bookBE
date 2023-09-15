import express, { json } from 'express';
import homeRouter from './routes/home';
import aboutRouter from './routes/about';

const app = express();
app.use('/', (req, res) => {
  res.json({ mesage: 'heelo' })
});;

app.use('/home', homeRouter);
app.use('/about', aboutRouter);

app.listen(4096, () => {
  console.log('starting server on Port');
});