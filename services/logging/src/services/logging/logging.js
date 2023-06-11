import { getHazelcastClient } from '../../utils/hazelcast/hazelcast.js';
import { getMongoDbConnection } from '../../persistence/mongoDb/mongoDb.js';

/**
 * Class with service methods for logging service
 */
export default class LoggingService {
  /**
   * Add new log to the logs queue
   * @param {*} review
   * @returns
   */
  async addLog(logItem) {
    const hazelcastClient = getHazelcastClient();
    const queueName = 'logs';
    const logsQueue = await hazelcastClient.getQueue(queueName);
    const newLogItem = {
      service: logItem.service,
      text: logItem.text,
    };

    try {
      await logsQueue.put(newLogItem);

      console.log(
        `Log ${JSON.stringify(newLogItem)} was added to ${queueName} queue`
      );
    } catch (error) {
      return { error: { code: 500, message: error } };
    }

    return { result: newLogItem };
  }

  /**
   * Get all logs by service name
   * @param {*} review
   * @returns
   */
  async getLogsByServiceName(service) {
    console.log(service);

    const mongoDbClient = getMongoDbConnection();
    let logs;
    // sort in descending (-1) order by length
    const logsSort = { date: -1 };

    try {
      const rawLogsResponse = await mongoDbClient
        .db('project')
        .collection('logs')
        .find({ service })
        .sort(logsSort);

      logs = await rawLogsResponse.toArray();
    } catch (error) {
      if (error) return { error: { code: 500, message: error } };
    }

    return { result: logs };
  }
}
