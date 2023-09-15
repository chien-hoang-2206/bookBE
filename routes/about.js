// routes/about.js
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is the about page');
});

export default router;
