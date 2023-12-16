const {
  Certificate,
  Client,
  CertificateVsTransaction,
  TransactionType
} = require('../database/models/index');
const {
  isCertificateFinished,
  getCertificateStatus,
  addVirtualColumns
} = require('../utils/utils');

const getCertificateBalanceById = async (certificateId) => {
  try {
    let certificate = await Certificate.findByPk(certificateId, {
      attributes: {
        exclude: ['id_cliente']
      },
      include: [
        {
          model: Client,
          as: 'cliente'
        },
        {
          model: TransactionType,
          as: 'tipo_transaccion',
          through: {
            model: CertificateVsTransaction,
            attributes: ['monto']
          }
        }
      ]
    });
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
          model: TransactionType,
          as: 'tipo_transaccion',
          through: {
            model: CertificateVsTransaction,
            attributes: ['monto']
          }
        }
      ]
    });
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
  const certificate = await Certificate.findByPk(certificateId, {
    attributes: {
      exclude: ['id_cliente']
    },
    include: [
      {
        model: Client,
        as: 'cliente'
      },
      {
        model: TransactionType,
        as: 'tipo_transaccion',
        through: {
          model: CertificateVsTransaction,
          attributes: ['monto']
        }
      }
    ]
  });
  if (isCertificateFinished(certificate.final_date)) {
    return {
      status: 400,
      response: { message: 'Certificate has already finished' }
    };
  } else {
    await CertificateVsTransaction.create({
      id_certificado: certificateId,
      id_tipo_transaccion: 1,
      monto: amount
    });
  }
  return { status: 201, response: { certificado: certificate } };
};
const withdrawCertificate = async (certificateId, amount) => {
  const certificate = await Certificate.findByPk(certificateId, {
    attributes: {
      exclude: ['id_cliente']
    },
    include: [
      {
        model: Client,
        as: 'cliente'
      },
      {
        model: TransactionType,
        as: 'tipo_transaccion',
        through: {
          model: CertificateVsTransaction,
          attributes: ['monto']
        }
      }
    ]
  });
  const penalty = isCertificateFinished(certificate.final_date) ? 0 : 0.65;
  const total = amount + amount * penalty;
  await CertificateVsTransaction.create({
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
      certificado: certificate
    }
  };
};

module.exports = {
  getCertificateBalanceById,
  clientCertificates,
  depositCertificate,
  withdrawCertificate
};
