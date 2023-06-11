import express from 'express';

import { loggingRouter } from './routes/logging.js';
import {
  getMongoDbConnectionUri,
  setMongoDbConnection,
} from './persistence/mongoDb/mongoDb.js';
import {
  getHazelcastConfig,
  setHazelcastConnection,
} from './utils/hazelcast/hazelcast.js';
import { registerSelf } from './utils/consul/consul.js';

const app = express();
const port = process.env.PORT || 3003;

// Register service in Consul
await registerSelf('logging', 'localhost', port);

app.use(express.json());
app.use(loggingRouter);

const hazelcastConfig = getHazelcastConfig();
const mongoDbConnectionUri = getMongoDbConnectionUri();

await setHazelcastConnection(hazelcastConfig);
await setMongoDbConnection(mongoDbConnectionUri);

app.listen(port, () => console.log(`Running on port ${port}`));
