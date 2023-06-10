import express from 'express';

import { announcementRouter } from './routes/announcement.js';
import { getMysqlConfig, setMysqlConnection } from './persistence/mysql/mysql.js';

const app = express();
const port = 3001

app.use(express.json())
app.use(announcementRouter);

const mysqlConfig = getMysqlConfig();

// Set mysql connection
await setMysqlConnection(mysqlConfig)

app.listen(port, () =>
  console.log(`Running on port ${port}`)
);