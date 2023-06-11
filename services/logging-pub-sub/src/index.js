import {
  getHazelcastConfig,
  setHazelcastConnection,
} from './utils/hazelcast/hazelcast.js';
import { subscribeToHazelcastLogsQueue } from './services/hazelcast/hazelcast.js';
import { getMongoDbConnectionUri, setMongoDbConnection } from './persistence/mongoDb/mongoDb.js';

const hazelcastConfig = getHazelcastConfig();
const mongoDbConnectionUri = getMongoDbConnectionUri();

await setHazelcastConnection(hazelcastConfig);
await setMongoDbConnection(mongoDbConnectionUri);
await subscribeToHazelcastLogsQueue();
