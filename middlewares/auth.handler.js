const boom = require('@hapi/boom');
const {config} = require('./../config/config');


function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next()
  } else {
    next(boom.unauthorized())
  }
}

function checkRole(...roles) {
  return function (req, res, next) {
    const user = req.user
    if (roles.includes(user.role)) {
      next()
    } else {
      next(boom.forbidden())
    }
  }
}

function checkIdentity() {
  return function (req, res, next) {
    const user = req.user;
    const {id} = req.params
    if (user.sub.toString() === id || user.role === 'admin') {
      next()
    } else {
      next(boom.forbidden())
    }
  }
}

module.exports = {checkApiKey, checkRole, checkIdentity}
