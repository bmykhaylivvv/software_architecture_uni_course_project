import LoggingService from '../services/logging/logging.js';
import Log from '../domain/log.js';

const loggingService = new LoggingService();

/**
 * Class representing logging service controller
 */
export default class LoggingController {
  /**
   * POST / controller
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async addLog(req, res) {
    const { service, text } = req.body;

    if (!(service && text)) return res.status(400).send('Invalid payload');

    const logItem = new Log(service, text);
    const { error, result } = await loggingService.addLog(logItem);

    if (error) return res.status(error.code).send(error.message);

    return res.status(200).send(result);
  }

  /**
   * GET /?service=abc controller
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async getLogsByServiceName(req, res) {
    const { service } = req.query;

    if (!service) return res.status(400).send('No service name provided');

    const { error, result } = await loggingService.getLogsByServiceName(service);

    if (error) return res.status(error.code).send(error.message);

    return res.status(200).send(result);
  }
}
