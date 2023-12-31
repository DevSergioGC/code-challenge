const {
  Certificate,
  Client,
  CertificateVsTransaction,
  TransactionType
} = require('../database/models/index');
const { addVirtualColumns, getCertificateQuery } = require('../utils/utils');

const requestCertificate = async (certificate) => {
  try {
    const client = await Client.findByPk(certificate.id_cliente);
    if (!client || Array(client).length === 0) {
      return { status: 404, response: { message: 'Client not found' } };
    }
    const newCertificate = await Certificate.create(certificate);
    return { status: 201, response: { certificado: newCertificate } };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const getCertificates = async () => {
  try {
    const certificates = await Certificate.findAll({
      include: {
        model: Client,
        as: 'cliente'
      },
      attributes: {
        exclude: ['id_cliente']
      }
    });
    if (certificates.length > 0) {
      return { status: 200, response: { certificado: certificates } };
    } else {
      return { status: 404, response: { message: 'No certificates found' } };
    }
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const getCertificateRevenueById = async (certificateId) => {
  try {
    let certificate = await getCertificateQuery(
      certificateId,
      Certificate,
      Client,
      TransactionType,
      CertificateVsTransaction
    );
    if (!certificate || Array(certificate).length === 0) {
      return {
        status: 404,
        response: { message: 'Certificate not found' }
      };
    }
    certificate = await addVirtualColumns(
      Array(certificate),
      CertificateVsTransaction
    );
    return certificate;
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};

module.exports = {
  requestCertificate,
  getCertificates,
  getCertificateRevenueById
};
