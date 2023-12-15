const {
  requestCertificate,
  getCertificates,
  getCertificateById,
  getCertificateBalanceById,
  clientCertificates,
  depositCertificate,
  withdrawCertificate
} = require('../../services/certificate.service');
const { validateCertificate } = require('../../utils/validation/validation');

const httpRequestCertificate = async (req, res) => {
  const { error } = validateCertificate(req.body);
  if (error) {
    res.status(400).send({ error: error.details[0].message });
  }
  try {
    const certificate = await requestCertificate(req.body);
    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const httpGetAllCertificates = async (req, res) => {
  try {
    const certificates = await getCertificates();
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const httpGetCertificateById = async (req, res) => {
  try {
    const { certificateId } = req.params;
    const certificate = await getCertificateById(certificateId);
    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const httpGetCertificateBalanceById = async (req, res) => {
  try {
    const { certificateId } = req.params;
    const certificate = await getCertificateBalanceById(certificateId);
    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const httpClientCertificates = async (req, res) => {
  try {
    const { clientId } = req.params;
    const certificates = await clientCertificates(clientId);
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const httpDepositCertificate = async (req, res) => {
  try {
    const { amount, certificateId } = req.body;
    const certificate = await depositCertificate(certificateId, amount);
    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const httpWithdrawCertificate = async (req, res) => {
  try {
    const { amount, certificateId } = req.body;
    const certificate = await withdrawCertificate(certificateId, amount);
    res.status(200).json(certificate);
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
