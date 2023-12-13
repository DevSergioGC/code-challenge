/* eslint-disable no-unused-vars */
const express = require('express');
const sequelize = require('./database/db');

// ? Routes
const clientRoutes = require('./routes/clients/client.router');
const certificateRoutes = require('./routes/certificates/certificate.router');

// ? Models
const Clients = require('./database/querys/client.query');
const Certificates = require('./database/querys/certificate.query');

Clients();
Certificates();

const app = express();

app.use(express.json());

app.use('/cliente', clientRoutes);
app.use('/certificado', certificateRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log('Database and tables synced');
});

module.exports = app;
