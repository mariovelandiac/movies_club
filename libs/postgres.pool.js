const { Pool } = require('pg');
const { config } = require('./../config/config');

// Condicional para producción y desarrollo
let URI = '';

if (config.isProd) {
  URI = config.dbURL
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  // url de conexión
  URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
}

// se configura para enviar una sola URL con toda la info


// se le envía a pool la base de datos
const pool = new Pool({connectionString: URI});

module.exports = pool;
