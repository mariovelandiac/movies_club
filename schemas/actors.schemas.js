const Joi = require("joi");


const id = Joi.number();
const name = Joi.string().min(3).max(50);
const limit = Joi.number();
const offset = Joi.number();

const createActorSchema = Joi.object({
  name: name.required(),
})

const updateActorSchema = Joi.object({
  name: name,
})

const getActorSchema = Joi.object({
  id: id.required()
})

const querySchema = Joi.object({
  limit: limit,
  offset: offset
})


module.exports = {createActorSchema, updateActorSchema,getActorSchema, querySchema}
