const { models } = require('./../libs/sequelize');
const boom = require("@hapi/boom")

function emailValidator() {
  return async function (req, res, next) {
    const data = req.body;
    const userEmail = data.email;
    const existsEmail = await models.User.findAll({
      where: {
        email: userEmail
      }
    })
    if (!existsEmail[0]) {
      next()
    } else {
      next(boom.badRequest('mail must be unique'));
    }
  }
}


module.exports = emailValidator;
