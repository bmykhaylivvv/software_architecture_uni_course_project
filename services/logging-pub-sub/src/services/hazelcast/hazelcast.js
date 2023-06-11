import Log from '../../domain/log.js'
import { getHazelcastClient } from '../../utils/hazelcast/hazelcast.js';
import { writeLogToMongoDb } from '../mongoDb/mongoDb.js'

/**
 * Subscribe to Hazelcast queue and write each message to MongoDB collection
 */
export async function subscribeToHazelcastLogsQueue() {
  const hazelcastClient = getHazelcastClient();
  const queueName = 'logs';
  const logsQueue = await hazelcastClient.getQueue(queueName);

  console.log(`Successfully connected to ${queueName} queue`);

  while (true) {
    const item = await logsQueue.take();
    const { service, text } = item;
    const logItem = new Log(service, text);

    await writeLogToMongoDb(logItem);
  }
}


