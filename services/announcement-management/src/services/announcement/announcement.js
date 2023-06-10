import { to } from 'await-to-js';

import { getMysqlConnection } from '../../persistence/mysql/mysql.js';

/**
 * Class with service methods for announcement-management service
 */
export default class AnnouncementService {
  async testService() {
    const connection = getMysqlConnection();
    const query = 'select * from announcement;';

    const [error, [resultRows, _]] = await to(
      connection.promise().query(query)
    );

    if (error) console.log(error);
    else console.log(resultRows);

    return { result: 'Test service' };
  }
}
