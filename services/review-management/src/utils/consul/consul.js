import { to } from 'await-to-js';
import { Consul } from 'consul/lib/consul.js';

/**
 * Register current microservice in Consul registry
 * @returns
 */
export async function registerSelf(serviceName, serviceHost, servicePort) {
  const consul = getConsulInstance();
  const service = {
    id: serviceHost,
    name: serviceName,
    address: serviceHost,
    port: parseInt(servicePort, 10),
  };

  const [err] = await to(consul.agent.service.register(service));

  if (err)
    return console.log(
      `Error registering ${serviceName} on port ${servicePort} in Consul, ${err}`
    );

  console.log(`${serviceName} on port ${servicePort} registered in Consul`);
}

/**
 * Return Consul instance creating using passed config
 * @returns
 */
export function getConsulInstance() {
  const consulConfig = getConsulConfig();
  const consul = new Consul(consulConfig);

  return consul;
}

/**
 * Get config for Consul instance
 * @returns
 */
function getConsulConfig() {
  return { host: 'localhost', port: 8500 };
}
