/**
 * Class representing Log entity for logging service
 */
export default class Log {
  /**
   * Name of the service which log come from
   */
  service = null;

  /**
   * Text of the log
   */
  text = null;

  /**
   * Date of the log
   */
  date = null;

  constructor(service, text) {
    this.service = service;
    this.text = text;
    this.date = new Date();
  }
}
