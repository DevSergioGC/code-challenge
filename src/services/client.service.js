const Client = require('../database/models/client.model');

const getAllClients = async () => {
  const clients = await Client.findAll({
    order: [['id', 'ASC']]
  });
  if (clients.length === 0) {
    return { status: 404, response: { message: 'No clients found' } };
  } else {
    return { status: 200, response: { clientes: clients } };
  }
};
const createClient = async (client) => {
  const newClient = await Client.create(client);
  return { status: 201, response: { cliente: newClient } };
};
const updateClient = async (clientId, updatedClient) => {
  const client = await Client.findByPk(clientId);
  await client.update(updatedClient);
  return { status: 200, response: { cliente: client } };
};

module.exports = {
  getAllClients,
  createClient,
  updateClient
};
