import mysql from 'mysql2';

let connection;

/**
 * Get mysql config
 * @returns
 */
export function getMysqlConfig() {
  const host = 'localhost';
  const user = 'admin';
  const password = 'admin';
  const database = 'project';

  return {
    host,
    user,
    password,
    database,
  };
}

/**
 * Create new mysql connection
 * @param config
 * @returns {Promise<void>}
 */
export async function setMysqlConnection(config) {
  try {
    connection = await mysql.createConnection(config);

    console.log('Connected to the MySQL server.');
  } catch (error) {
    return console.error('error: ' + err.message);
  }
}

/**
 * Return actual mysql client
 * @returns {*}
 */
export function getMysqlConnection() {
  return connection;
}
