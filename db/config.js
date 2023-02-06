const { config } = require('./../config/config');

module.exports = {
  development: {
    url: config.dbURL,
    dialect: 'postgres'
  },
  production: {
    url: config.dbURL, // la URL de producción es diferente. Pero, por ahora, la misma
    dialect: 'postgres'
  }
}
