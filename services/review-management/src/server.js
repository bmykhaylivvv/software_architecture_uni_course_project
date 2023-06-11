import express from 'express';

import { reviewRouter } from './routes/review.js';
import { getMongoDbConnectionUri, setMongoDbConnection } from './persistence/mongodb/mongodb.js';
import { registerSelf } from './utils/consul/consul.js';

const app = express();
const port = 3002

// Register service in Consul
await registerSelf('review-management', 'localhost', port)

app.use(express.json())
app.use(reviewRouter);

const mongoDbConnectionUri = getMongoDbConnectionUri();

await setMongoDbConnection(mongoDbConnectionUri);

app.listen(port, () =>
  console.log(`Running on port ${port}`)
);