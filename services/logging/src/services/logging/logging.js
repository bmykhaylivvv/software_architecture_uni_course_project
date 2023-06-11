import { getHazelcastClient } from '../../utils/hazelcast/hazelcast.js';
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

      console.log(`Log ${JSON.stringify(newLogItem)} was added to ${queueName} queue`);
    } catch (error) {
      return { error: { code: 500, message: error } };
    }

    return { result: newLogItem };
  }
}
