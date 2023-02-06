const Joi = require("joi");


const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);



const createProducerSchema = Joi.object({
  name: name.required(),

})

const updateProducerSchema = Joi.object({
  name: name,

})

const getProducerSchema = Joi.object({
  id: id.required()
})



module.exports = {createProducerSchema, updateProducerSchema,getProducerSchema}
