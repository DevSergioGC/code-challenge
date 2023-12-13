const express = require('express');
const {
  httpGetAllClients,
  httpCreateClient,
  httpUpdateClient
} = require('./client.controller');

const router = express.Router();

router
  .get('/list', httpGetAllClients)
  .post('/created', httpCreateClient)
  .patch('/update/:clientId', httpUpdateClient);

module.exports = router;
