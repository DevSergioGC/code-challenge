const getRevenue = (data) => {
  const n = 12;
  const r = data.tasa / 100 / n;
  const t = getMonthsDifference(data.fec_creado, data.fec_vencimiento) / 12;
  const A = data.monto * Math.pow(1 + r, n * t) - data.monto;
  return {
    yearlyRevenue: Number(A.toFixed(2)),
    monthlyRevenue: Number((A / 12).toFixed(2))
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

module.exports = {
  getRevenue
};
