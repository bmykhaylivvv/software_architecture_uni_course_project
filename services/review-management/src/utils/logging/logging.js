import axios from 'axios';

import { getServiceInstanceByName } from '../consul/consul.js';

/**
 * Add new log
 * @param {*} service
 * @param {*} text
 */
export async function addNewLog(service, text) {
  const loggingServiceName = 'logging';
  const loggingServiceAddress = await getServiceInstanceByName(
    loggingServiceName
  );
  const loggingServiceUrl = `http://${loggingServiceAddress}`;
  const logBody = {
    service,
    text,
  };

  console.log(loggingServiceUrl);

  console.log('logBody', logBody)
  
  await axios.post(loggingServiceUrl, logBody);

  console.log(`Log ${JSON.stringify(logBody)} was added to the database`);
}
