import { getMongoDbConnection } from '../../persistence/mongoDb/mongoDb.js';

/**
* Write log object to MongoDB logs collection
* @param {*} logItem 
*/
export async function writeLogToMongoDb(logItem) {
 const mongoDbClient = getMongoDbConnection();
 const logsCollectionName = 'logs';
 const newLog = {
   service: logItem.service,
   text: logItem.text,
   date: logItem.date
 }
 
 try {
   await mongoDbClient.db('project').collection(logsCollectionName).insertOne(newLog);
   console.log(`Add ${JSON.stringify(logItem)} log item to logs collection`)
 } catch (error) {
   console.log(error);
 }
}