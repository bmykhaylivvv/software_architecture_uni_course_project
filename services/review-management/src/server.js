import express from 'express';

import { reviewRouter } from './routes/review.js';
import { getMongoDbConnectionUri, setMongoDbConnection } from './persistence/mongodb/mongodb.js';

const app = express();
const port = 3002

app.use(express.json())
app.use(reviewRouter);

const mongoDbConnectionUri = getMongoDbConnectionUri();

await setMongoDbConnection(mongoDbConnectionUri);

app.listen(port, () =>
  console.log(`Running on port ${port}`)
);