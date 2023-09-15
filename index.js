const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Sử dụng cổng 3000 hoặc PORT môi trường

// Sử dụng các middleware cơ bản
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sử dụng các router
const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about');

app.use('/', homeRouter);
app.use('/about', aboutRouter);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
