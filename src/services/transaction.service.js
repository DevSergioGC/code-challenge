const {
  Certificate,
  Client,
  CertificateVsTransaction,
  TransactionType
} = require('../database/models/index');
const {
  isCertificateFinished,
  getCertificateStatus,
  addVirtualColumns,
  getCertificateQuery,
  getTotalAmount
} = require('../utils/utils');

const getCertificateBalanceById = async (certificateId) => {
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
const clientCertificates = async (clientId) => {
  try {
    let certificates = await Certificate.findAll({
      where: {
        id_cliente: clientId
      },
      attributes: {
        exclude: ['id_cliente']
      },
      include: [
        {
          model: Client,
          as: 'cliente'
        },
        {
          model: CertificateVsTransaction,
          attributes: ['monto'],
          include: [
            {
              model: TransactionType,
              attributes: ['tipo_transaccion']
            }
          ]
        }
      ]
    });
    if (!certificates || certificates.length === 0) {
      return {
        status: 404,
        response: { message: 'This client does not have certificates' }
      };
    }
    certificates = await addVirtualColumns(
      certificates,
      CertificateVsTransaction
    );
    return certificates;
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const depositCertificate = async (certificateId, amount) => {
  try {
    const certificate = await getCertificateQuery(
      certificateId,
      Certificate,
      Client,
      TransactionType,
      CertificateVsTransaction
    );
    if (isCertificateFinished(certificate.fec_vencimiento)) {
      return {
        status: 400,
        response: { message: 'Certificate has already finished' }
      };
    }
    if (!certificate || Array(certificate).length === 0) {
      return {
        status: 404,
        response: { message: 'Certificate not found' }
      };
    }
    const deposit = await CertificateVsTransaction.create({
      id_certificado: certificateId,
      id_tipo_transaccion: 1,
      monto: amount
    });
    return { status: 201, response: { deposito: deposit } };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const withdrawCertificate = async (certificateId, amount) => {
  try {
    const certificate = await getCertificateQuery(
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
    const certificateTotal = getTotalAmount(
      certificate,
      CertificateVsTransaction
    );
    const penalty = isCertificateFinished(certificate.final_date) ? 0 : 0.10;
    const total = amount + amount * penalty;

    if (certificateTotal <= 0 || total > certificateTotal) {
      return {
        status: 400,
        response: { message: 'Certificate has no balance' }
      };
    }

    const withdraw = await CertificateVsTransaction.create({
      id_certificado: certificateId,
      id_tipo_transaccion: 2,
      monto: total
    });
    return {
      status: 201,
      response: {
        monto_retirado: total,
        penalidad: penalty,
        estado: getCertificateStatus(certificate.fec_vencimiento),
        retiro: withdraw
      }
    };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};

module.exports = {
  getCertificateBalanceById,
  clientCertificates,
  depositCertificate,
  withdrawCertificate
};
