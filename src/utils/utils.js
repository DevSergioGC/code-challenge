const getRevenue = (data) => {
  const n = 12;
  const r = data.tasa / 100 / n;
  const t = getMonthsDifference(data.fec_creado, data.fec_vencimiento) / 12;
  const A = data.monto_inicial * Math.pow(1 + r, n * t) - data.monto_inicial;
  return {
    yearlyRevenue: Number(A.toFixed(2)),
    monthlyRevenue: Number((A / 12).toFixed(2))
  };
};

const getActualBalance = (data) => {
  let finalDate = new Date();

  if (isCertificateFinished(data.fec_vencimiento)) {
    finalDate = data.fec_vencimiento;
  }

  const dateDiff = getMonthsDifference(data.fec_creado, finalDate);
  const { monthlyRevenue } = getRevenue(data);
  const amountDiff = monthlyRevenue * dateDiff;
  const actualBalance = data.monto_inicial + amountDiff;
  return {
    dinero_ganado: Number(amountDiff.toFixed(2)),
    balance_actual: Number(actualBalance.toFixed(2)),
    ganancia_mensual: Number(monthlyRevenue.toFixed(2)),
    meses_contados: dateDiff
  };
};

const getMonthsDifference = (initDate, finalDate) => {
  initDate = new Date(initDate);
  finalDate = new Date(finalDate);
  const diff =
    (finalDate.getFullYear() - initDate.getFullYear()) * 12 +
    finalDate.getMonth() -
    initDate.getMonth();
  return diff;
};

const isCertificateFinished = (finalDate) => {
  const actualDate = new Date();
  const certificateDate = new Date(finalDate);

  if (actualDate > certificateDate) {
    return true;
  } else {
    return false;
  }
};

const getCertificateStatus = (finalDate) => {
  const actualDate = new Date();
  const certificateDate = new Date(finalDate);

  if (actualDate > certificateDate) {
    return 'Vencido';
  } else {
    return 'Activo';
  }
};

const getTransactions = async (table, certificateId, transactionTypeId) => {
  try {
    const result = await table.sum('monto', {
      where: {
        id_tipo_transaccion: transactionTypeId,
        id_certificado: certificateId
      }
    });

    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const getTotalAmount = async (certificateTable, transactionsTable) => {
  const { dinero_ganado } = getActualBalance(certificateTable);
  const deposits = await getTransactions(
    transactionsTable,
    certificateTable.id,
    1
  );
  const withdrawals = await getTransactions(
    transactionsTable,
    certificateTable.id,
    2
  );

  return (
    certificateTable.monto_inicial + dinero_ganado + deposits - withdrawals
  );
};

const addNewAmountColumn = async (certificateTable, transactionsTable) => {
  if (certificateTable.length <= 1 || certificateTable.length === undefined) {
    certificateTable.monto_total = await getTotalAmount(
      certificateTable,
      transactionsTable
    );
  } else {
    certificateTable.forEach(async (row) => {
      const certificate = row.get();
      certificate.monto_total = await getTotalAmount(
        certificateTable,
        transactionsTable
      );
    });
  }
  return certificateTable;
};

const addNewDetailColumn = (table) => {
  if (table.length <= 1 || table.length === undefined) {
    table.informe = getActualBalance(table);
  } else {
    table.forEach((row) => {
      const certificate = row.get();
      certificate.informe = getActualBalance(certificate);
    });
  }
  return table;
};

const addNewStateColumn = (table) => {
  if (table.length <= 1 || table.length === undefined) {
    table.estado = getCertificateStatus(table.fec_vencimiento);
  } else {
    table.forEach((row) => {
      const certificate = row.get();
      certificate.estado = getCertificateStatus(certificate.fec_vencimiento);
    });
  }
  return table;
};

const addTransactionColumn = async (certificateTable, transactionTable) => {
  const column = {
    total_depositado:
      (await getTransactions(transactionTable, certificateTable.id, 1)) === null
        ? 0
        : await getTransactions(transactionTable, certificateTable.id, 1),
    total_retirado:
      (await getTransactions(transactionTable, certificateTable.id, 2)) === null
        ? 0
        : await getTransactions(transactionTable, certificateTable.id, 2)
  };
  if (certificateTable.length <= 1 || certificateTable.length === undefined) {
    certificateTable.transacciones = column;
  } else {
    certificateTable.forEach((row) => {
      const certificate = row.get();
      certificate.transacciones = column;
    });
  }
  return certificateTable;
};

const addVirtualColumns = async (certificateTable, transactionTable) => {
  if (certificateTable && certificateTable.length > 0) {
    certificateTable = certificateTable.map(async (certificate) => {
      let certificateData = certificate.toJSON();
      certificateData = await addNewAmountColumn(
        certificateData,
        transactionTable
      );
      certificateData = await addNewDetailColumn(certificateData);
      certificateData = await addNewStateColumn(certificateData);
      certificateData = await addTransactionColumn(
        certificateData,
        transactionTable
      );
      return certificateData;
    });
    return {
      status: 200,
      response: { certificado: await Promise.all(certificateTable) }
    };
  } else if (certificateTable && certificateTable.length === 1) {
    let certificateData = certificateTable[0].toJSON();
    certificateData = await addNewAmountColumn(
      certificateData,
      transactionTable
    );
    certificateData = await addNewDetailColumn(certificateData);
    certificateData = await addNewStateColumn(certificateData);
    return { status: 200, response: { certificado: certificateData } };
  } else {
    return { status: 404, response: 'No certificates found' };
  }
};

const getCertificateQuery = async (
  id,
  certificateTable,
  clientTable,
  transactionTypeTable,
  transactionsTable
) => {
  const certificate = await certificateTable.findByPk(id, {
    attributes: {
      exclude: ['id_cliente']
    },
    include: [
      {
        model: clientTable,
        as: 'cliente'
      },
      {
        model: transactionsTable,
        attributes: ['monto'],
        include: [
          {
            model: transactionTypeTable,
            attributes: ['tipo_transaccion']
          }
        ]
      }
    ]
  });
  return certificate;
};

module.exports = {
  getRevenue,
  getActualBalance,
  isCertificateFinished,
  getCertificateStatus,
  getTransactions,
  addNewAmountColumn,
  addNewDetailColumn,
  addNewStateColumn,
  addVirtualColumns,
  getCertificateQuery,
  getTotalAmount
};
