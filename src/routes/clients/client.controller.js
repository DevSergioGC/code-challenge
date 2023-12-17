const {
  getAllClients,
  createClient,
  updateClient
} = require('../../services/client.service');
const {
  validateClient,
  validateUpdateClient
} = require('../../utils/validation/validation');

const httpGetAllClients = async (req, res) => {
  try {
    const clients = await getAllClients();
    res.status(clients.status).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const httpCreateClient = async (req, res) => {
  try {
    const { error } = validateClient(req.body);
    if (error) {
      return {
        status: 400,
        message: error.details[0].message
      };
    }
    try {
      const client = await createClient(req.body);
      res.status(client.status).json(client);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const httpUpdateClient = async (req, res) => {
  try {
    const { error } = validateUpdateClient(req.body);
    if (error) {
      res.status(400).send({ error: error.details[0].message });
    }
    try {
      const { clientId } = req.params;
      const client = await updateClient(clientId, req.body);
      res.status(client.status).json(client);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  httpGetAllClients,
  httpCreateClient,
  httpUpdateClient
};
