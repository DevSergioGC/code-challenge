/* eslint-disable camelcase */
/* eslint-disable no-undef */
const {
  requestCertificate,
  getCertificates,
  getCertificateById
} = require('../../services/certificate.service');
const {
  getCertificateBalanceById,
  clientCertificates,
  depositCertificate,
  withdrawCertificate
} = require('../../services/transaction.service');
const {
  validateCertificate,
  validateTransaction
} = require('../../utils/validation/validation');

const httpRequestCertificate = async (req, res) => {
  const { error } = validateCertificate(req.body);
  if (error) {
    return {
      status: 400,
      message: error.details[0].message
    };
  }
  try {
    const certificate = await requestCertificate(req.body);
    res.status(certificate.status).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const httpGetAllCertificates = async (req, res) => {
  try {
    const certificates = await getCertificates();
    res.status(certificates.status).json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const httpGetCertificateById = async (req, res) => {
  try {
    const { certificateId } = req.params;
    const certificate = await getCertificateById(certificateId);
    res.status(certificate.status).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const httpGetCertificateBalanceById = async (req, res) => {
  try {
    const { certificateId } = req.params;
    const certificate = await getCertificateBalanceById(certificateId);
    res.status(certificate.status).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const httpClientCertificates = async (req, res) => {
  try {
    const { clientId } = req.params;
    const certificates = await clientCertificates(clientId);
    res.status(certificates.status).json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const httpDepositCertificate = async (req, res) => {
  const { error } = validateTransaction(req.body);
  if (error) {
    return {
      status: 400,
      message: error.details[0].message
    };
  }
  try {
    const { monto, id_certificado } = req.body;
    const certificate = await depositCertificate(
      (certificateId = id_certificado),
      (amount = monto)
    );
    res.status(certificate.status).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const httpWithdrawCertificate = async (req, res) => {
  const { error } = validateTransaction(req.body);
  if (error) {
    return {
      status: 400,
      message: error.details[0].message
    };
  }
  try {
    const { monto, id_certificado } = req.body;
    const certificate = await withdrawCertificate(
      (certificateId = id_certificado),
      (amount = monto)
    );
    res.status(certificate.status).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  httpRequestCertificate,
  httpGetAllCertificates,
  httpGetCertificateById,
  httpGetCertificateBalanceById,
  httpClientCertificates,
  httpDepositCertificate,
  httpWithdrawCertificate
};
