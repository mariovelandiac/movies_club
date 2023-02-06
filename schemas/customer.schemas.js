const Joi = require("joi");
const {createUserSchema} = require('./users.schemas')

const id = Joi.number();
const name = Joi.string().min(3).max(50);
const lastName = Joi.string().min(3).max(50);
const phone = Joi.string().min(7).max(20);
const userId = Joi.number().integer();




const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema.required()
})

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId
})

const getCustomerSchema = Joi.object({
  id: id.required()
})



module.exports = {createCustomerSchema, updateCustomerSchema,getCustomerSchema}
