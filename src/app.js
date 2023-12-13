/* eslint-disable no-unused-vars */
const express = require('express');
const sequelize = require('./database/db');

// ? Routes

// ? Models

const app = express();

app.use(express.json());

// app.use('/person', personRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log('Database and tables synced');
});

module.exports = app;
