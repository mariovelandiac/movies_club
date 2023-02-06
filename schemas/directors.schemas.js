const Joi = require("joi");


const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const gender = Joi.string();
const biography = Joi.string();


const createDirectorSchema = Joi.object({
  name: name.required(),
  gender: gender.required(),
  biography: biography.required()
})

const updateDirectorSchema = Joi.object({
  name: name,
  gender: gender,
  biography: biography
})

const getDirectorSchema = Joi.object({
  id: id.required()
})



module.exports = {createDirectorSchema, updateDirectorSchema,getDirectorSchema}
