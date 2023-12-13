const express = require('express');
const {
  httpRequestCertificate,
  httpGetAllCertificates,
  httpGetCertificateById
} = require('./certificate.controller');

const router = express.Router();

router
  .post('/request', httpRequestCertificate)
  .get('/list', httpGetAllCertificates)
  .get('/ganancia/:certificateId', httpGetCertificateById);

module.exports = router;
