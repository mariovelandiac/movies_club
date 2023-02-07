const {Strategy} = require('passport-local');
const AuthService = require('./../../../services/auth.services');
const service = new AuthService();

// aca definimos la lógica de negocio para la autenticación
const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password)
      done(null, user)
    } catch (e) {
      done(e, false)
    }
  }
);

module.exports = LocalStrategy
