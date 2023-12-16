const express = require('express');
const {
  httpRequestCertificate,
  httpGetAllCertificates,
  httpGetCertificateById,
  httpGetCertificateBalanceById,
  httpClientCertificates,
  httpDepositCertificate,
  httpWithdrawCertificate
} = require('./certificate.controller');

const router = express.Router();

router
  .post('/request', httpRequestCertificate)
  .get('/list', httpGetAllCertificates)
  .get('/ganancia/:certificateId', httpGetCertificateById)
  .get('/balance/:certificateId', httpGetCertificateBalanceById)
  .get('/balancecliente/:clientId', httpClientCertificates)
  .post('/deposito', httpDepositCertificate)
  .post('/retiro', httpWithdrawCertificate);

module.exports = router;
