const Client = require('../database/models/client.model');

const getAllClients = async () => {
  const clients = await Client.findAll();
  return clients;
};
const createClient = async (client) => {
  const newClient = await Client.create(client);
  return newClient;
};
const updateClient = async (clientId, updatedClient) => {
  const client = await Client.findByPk(clientId);
  await client.update(updatedClient);
  return client;
};

module.exports = {
  getAllClients,
  createClient,
  updateClient
};
