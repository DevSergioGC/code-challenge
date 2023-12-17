const Client = require('../database/models/client.model');

const getAllClients = async () => {
  try {
    const clients = await Client.findAll({
      order: [['id', 'ASC']]
    });
    if (clients.length === 0) {
      return { status: 404, response: { message: 'No clients found' } };
    } else {
      return { status: 200, response: { clientes: clients } };
    }
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};
const createClient = async (client) => {
  try {
    const newClient = await Client.create(client);
    return { status: 201, response: { cliente: newClient } };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};
const updateClient = async (clientId, updatedClient) => {
  try {
    const client = await Client.findByPk(clientId);
    await client.update(updatedClient);
    return { status: 200, response: { cliente: client } };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

module.exports = {
  getAllClients,
  createClient,
  updateClient
};
