const {
  requestCertificate,
  getCertificates,
  getCertificateById
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

module.exports = {
  httpRequestCertificate,
  httpGetAllCertificates,
  httpGetCertificateById
};
