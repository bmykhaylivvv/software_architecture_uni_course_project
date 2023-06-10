import express from 'express';

import { announcementRouter } from './routes/announcement.js';

const app = express();
const port = 3001

app.use(express.json())
app.use(announcementRouter);

app.listen(port, () =>
  console.log(`Running on port ${port}`)
);