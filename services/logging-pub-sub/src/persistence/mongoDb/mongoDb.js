import { MongoClient } from 'mongodb';

let client;

/**
 * Get MongoDB connection URI
 * @returns
 */
export function getMongoDbConnectionUri() {
  const connectionUri = 'mongodb://localhost:27017'

  return connectionUri;
}

/**
 * Create new MongoDB connection
 * @param config
 * @returns {Promise<void>}
 */
export async function setMongoDbConnection(connectionUri) {
  try {
    client = new MongoClient(connectionUri);

    console.log('Connected to the MongoDB instance.');
  } catch (error) {
    return console.error('error: ' + err.message);
  }
}

/**
 * Return actual MongoDB client
 * @returns {*}
 */
export function getMongoDbConnection() {
  return client;
}
