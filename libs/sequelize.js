const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const setupModels = require('./../db/models')
// se configura para enviar una sola URL con toda la info
// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword)

// para cambiar hay que installar el paquete de node de la bd
// postgres: npm i --save pg
// mysql: npm i --save mysql2
// url de conexión
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
const options = {
  dialect: 'postgres',
  loggin: config.isProd ? false : true
}
const sequelize = new Sequelize(config.dbURL, options);

// acá se configuran e inicializan las entidades de la base de datos con sus respectivas
// variables y constrains
setupModels(sequelize);


// acá sincronizamos el comportamiento del ORM con la base de datos
// sequelize.sync(); // no se recomienda

module.exports = sequelize
