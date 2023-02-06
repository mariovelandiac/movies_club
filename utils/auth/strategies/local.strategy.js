const {Strategy} = require('passport-local');
const boom = require('@hapi/boom')
const UserServices = require('./../../../services/users.services');
const bcrypt = require('bcrypt')
const service = new UserServices();
// aca definimos la lógica de negocio para la autenticación
const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);
      // validación de existencia
      if (!user) {
        done(boom.unauthorized(), false);
      }
      // validación de correspondencia
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.password
      done(null, user)
    } catch (e) {
      done(e, false)
    }
  }
);

module.exports = LocalStrategy
