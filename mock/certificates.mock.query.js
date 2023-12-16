const sequelize = require('../src/database/db');

const mockCertificates = `
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (3.7, 441233, '2022-12-10', '2022-10-09', 8);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (3.1, 288842, '2023-10-20', '2022-01-11', 12);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (8.7, 345480, '2024-11-14', '2021-12-14', 18);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (4.2, 433314, '2022-10-30', '2023-02-05', 16);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (3.8, 266483, '2023-10-26', '2023-03-16', 1);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (1.5, 230599, '2023-08-14', '2022-10-28', 12);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (8.7, 105006, '2023-07-22', '2023-07-18', 18);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (3.3, 279061, '2023-09-25', '2023-08-18', 13);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (4.8, 317908, '2022-10-05', '2022-05-08', 9);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (4.6, 205963, '2024-07-26', '2023-08-11', 1);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (3.7, 153568, '2024-06-11', '2023-04-05', 14);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (3.0, 116798, '2024-01-26', '2022-07-20', 16);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (5.9, 160516, '2024-05-26', '2022-05-31', 15);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (4.2, 297131, '2024-10-15', '2023-11-17', 5);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (9.1, 199938, '2024-07-26', '2023-06-06', 10);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (5.2, 369998, '2024-04-06', '2023-11-12', 13);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (3.1, 92346, '2024-01-15', '2022-02-12', 9);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (5.0, 301720, '2024-10-22', '2022-02-04', 19);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (6.7, 469384, '2024-07-09', '2022-04-03', 14);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (9.4, 87628, '2024-09-01', '2022-06-10', 5);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (9.2, 341916, '2024-06-27', '2022-08-19', 10);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (2.9, 235170, '2024-04-28', '2023-08-05', 15);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (6.6, 93356, '2024-05-06', '2023-04-14', 7);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (9.3, 310996, '2024-02-25', '2022-05-04', 18);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (1.7, 324152, '2023-01-16', '2022-12-24', 16);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (6.7, 316376, '2024-01-22', '2022-12-17', 1);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (1.4, 328300, '2024-02-17', '2021-12-31', 11);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (7.9, 224165, '2022-10-29', '2022-11-09', 20);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (2.1, 465305, '2024-03-07', '2022-01-31', 19);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (7.1, 333391, '2023-01-31', '2023-01-06', 8);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (8.1, 77671, '2024-08-28', '2022-01-30', 10);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (8.5, 72695, '2023-09-16', '2023-08-25', 3);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (5.6, 66549, '2023-10-07', '2022-05-02', 14);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (8.6, 194938, '2023-05-11', '2022-05-20', 14);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (5.6, 344813, '2022-10-27', '2023-11-09', 18);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (4.8, 192041, '2024-09-22', '2022-09-09', 1);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (8.8, 330644, '2023-06-22', '2022-05-12', 4);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (4.8, 148519, '2023-04-29', '2023-03-30', 3);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (3.9, 137698, '2024-04-27', '2022-05-14', 8);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (1.3, 196734, '2024-04-06', '2023-01-28', 11);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (9.6, 384601, '2023-12-30', '2023-07-12', 9);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (7.1, 198631, '2024-08-30', '2023-01-25', 20);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (3.1, 300463, '2023-01-11', '2023-07-04', 10);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (3.7, 197549, '2024-10-10', '2022-10-26', 16);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (1.4, 400226, '2023-05-04', '2023-08-21', 8);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (5.1, 365103, '2023-09-19', '2023-06-27', 6);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (7.4, 452065, '2023-04-21', '2022-07-15', 18);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (9.5, 188460, '2024-05-27', '2022-01-20', 14);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (2.0, 245181, '2024-07-12', '2022-11-24', 13);
insert into certificados (tasa, monto_inicial, fec_vencimiento, fec_creado, id_cliente) values (5.9, 259669, '2023-04-08', '2022-09-27', 6);
`;

module.exports = async () => {
  await sequelize
    .query(mockCertificates)
    .then(() => {
      console.log('Mock certificates table successfully');
    })
    .catch((error) => {
      console.error('Error mocking certificates table:', error);
    });
};
