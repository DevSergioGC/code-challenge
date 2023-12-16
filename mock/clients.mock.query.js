const sequelize = require('../src/database/db');

const mockClients = `
insert into clientes (nombre) values ('Odele');
insert into clientes (nombre) values ('Donetta');
insert into clientes (nombre) values ('Julietta');
insert into clientes (nombre) values ('Rockey');
insert into clientes (nombre) values ('Zitella');
insert into clientes (nombre) values ('Kass');
insert into clientes (nombre) values ('Dyana');
insert into clientes (nombre) values ('Garnet');
insert into clientes (nombre) values ('Hurleigh');
insert into clientes (nombre) values ('Christye');
insert into clientes (nombre) values ('Teirtza');
insert into clientes (nombre) values ('Job');
insert into clientes (nombre) values ('Rivy');
insert into clientes (nombre) values ('Donal');
insert into clientes (nombre) values ('Meade');
insert into clientes (nombre) values ('Pippo');
insert into clientes (nombre) values ('Nahum');
insert into clientes (nombre) values ('Bobbee');
insert into clientes (nombre) values ('Cheri');
insert into clientes (nombre) values ('Cad');
insert into clientes (nombre) values ('Kris');
insert into clientes (nombre) values ('Dulsea');
insert into clientes (nombre) values ('Edgar');
insert into clientes (nombre) values ('Rainer');
insert into clientes (nombre) values ('Bax');
insert into clientes (nombre) values ('Pammy');
insert into clientes (nombre) values ('Kevyn');
insert into clientes (nombre) values ('Julissa');
insert into clientes (nombre) values ('Boy');
insert into clientes (nombre) values ('Madonna');
insert into clientes (nombre) values ('Ruprecht');
insert into clientes (nombre) values ('Rosa');
insert into clientes (nombre) values ('Ediva');
insert into clientes (nombre) values ('Rufus');
insert into clientes (nombre) values ('Rosene');
insert into clientes (nombre) values ('Jazmin');
insert into clientes (nombre) values ('Joseph');
insert into clientes (nombre) values ('Mart');
insert into clientes (nombre) values ('Jilli');
insert into clientes (nombre) values ('Frannie');
insert into clientes (nombre) values ('Cristiano');
insert into clientes (nombre) values ('Conrado');
insert into clientes (nombre) values ('Murdoch');
insert into clientes (nombre) values ('Yvon');
insert into clientes (nombre) values ('Harriett');
insert into clientes (nombre) values ('Leona');
insert into clientes (nombre) values ('Olivie');
insert into clientes (nombre) values ('Marilin');
insert into clientes (nombre) values ('Ade');
insert into clientes (nombre) values ('Skelly');
`;

module.exports = async () => {
  await sequelize
    .query(mockClients)
    .then(() => {
      console.log('Mock clients table successfully');
    })
    .catch((error) => {
      console.error('Error mocking clients table:', error);
    });
};
