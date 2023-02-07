const passport = require('passport');
// aca se pueden importar la cantidad de estrategias que queramos (twitter, facebook, etc)
const LocalStrategy = require('./strategies/local.strategy')
const JwtStrategy = require('./strategies/jwt.strategy')


passport.use(LocalStrategy);
passport.use(JwtStrategy);

