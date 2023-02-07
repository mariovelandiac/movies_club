const Joi = require("joi");

const email = Joi.string().email();
const password = Joi.string().min(7).max(30).alphanum();
const token = Joi.string();



const getEmailSchema = Joi.object({
  email: email.required()
});

const newPasswordSchema = Joi.object({
  token: token.required(),
  newPassword: password.required()
});

module.exports = {getEmailSchema, newPasswordSchema}
