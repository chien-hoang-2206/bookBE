import express from 'express';
import homeRouter from './routes/home';
import aboutRouter from './routes/about';

const app = express();

app.use('/home', homeRouter);
app.use('/about', aboutRouter);

app.listen(4096, () => {
  console.log('App is running on port 4096');
});
