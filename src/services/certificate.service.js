const Certificate = require('../database/models/certificate.model');
const { getRevenue } = require('../utils/utils');

const requestCertificate = async (certificate) => {
  const newCertificate = await Certificate.create(certificate);
  return newCertificate;
};
const getCertificates = async () => {
  const certificates = await Certificate.findAll();
  return certificates;
};
const getCertificateById = async (certificateId) => {
  const certificate = await Certificate.findByPk(certificateId);
  const revenue = getRevenue(certificate);
  return { certificate, revenue };
};

module.exports = {
  requestCertificate,
  getCertificates,
  getCertificateById
};
