const Joi = require("joi");

const email = Joi.string().email();



const getEmailSchema = Joi.object({
  email: email.required()
});



module.exports = {getEmailSchema}
