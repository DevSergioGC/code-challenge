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
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const httpCreateClient = async (req, res) => {
  const { error } = validateClient(req.body);
  if (error) {
    res.status(400).send({ error: error.details[0].message });
  }
  try {
    const client = await createClient(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const httpUpdateClient = async (req, res) => {
  const { error } = validateUpdateClient(req.body);
  if (error) {
    res.status(400).send({ error: error.details[0].message });
  }
  try {
    const { clientId } = req.params;
    const client = await updateClient(clientId, req.body);
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  httpGetAllClients,
  httpCreateClient,
  httpUpdateClient
};
