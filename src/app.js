const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// ? Routes
const clientRoutes = require('./routes/clients/client.router');
const certificateRoutes = require('./routes/certificates/certificate.router');

// ? Models
const Clients = require('./database/querys/client.query');
const Certificates = require('./database/querys/certificate.query');
const CertificateVsTransaction = require('./database/querys/certificateVsTransaction.query');
const TransactionType = require('./database/querys/transactionType.query');

Clients();

setTimeout(() => {
  Certificates();
  console.log('Creating certificates table...');
}, 4000);

setTimeout(() => {
  TransactionType();
  console.log('Creating transaction type table...');
}, 5000);

setTimeout(() => {
  CertificateVsTransaction();
  console.log('Creating certificate vs transaction table...');
}, 6000);

const app = express();

const swaggerDocument = YAML.load('./openapi.yaml');

app.use(express.json());

app.use('/cliente', clientRoutes);
app.use('/certificado', certificateRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
