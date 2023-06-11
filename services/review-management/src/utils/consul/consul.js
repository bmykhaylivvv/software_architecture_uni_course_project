import { to } from 'await-to-js';
import { Consul } from 'consul/lib/consul.js';

/**
 * Get random instance from Consul by service name
 * @param {*} serviceName
 */
export async function getServiceInstanceByName(serviceName) {
  const consul = getConsulInstance();
  const [err, res] = await to(consul.catalog.service.nodes(serviceName));

  if (err)
    return console.log(`Error getting services with name: ${serviceName}`);

  if (res.length === 0)
    return console.log(`No services with name: ${serviceName}`);

  const services = res.map(
    (service) => `${service.ServiceAddress}:${service.ServicePort}`
  );
  const selectedRandomService =
    services[Math.floor(Math.random() * services.length)];

  return selectedRandomService;
}

/**
 * Register current microservice in Consul registry
 * @returns
 */
export async function registerSelf(serviceName, serviceHost, servicePort) {
  const consul = getConsulInstance();
  const service = {
    id: serviceHost + servicePort,
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
