import { Client } from 'hazelcast-client';

let client;

/**
 * Get Hazelcast config
 * @returns {{clusterName: string}}
 */
export function getHazelcastConfig() {
  return {
    clusterName: 'project',
    network: {
      clusterMembers: [
        'localhost'
      ]
    },
  };
}

/**
 * Create new Hazelcast client
 * @param config
 * @returns {Promise<void>}
 */
export async function setHazelcastConnection(config) {
  client = await Client.newHazelcastClient(config);
}

/**
 * Return actual Hazelcast client
 * @returns {*}
 */
export function getHazelcastClient() {
  return client;
}
