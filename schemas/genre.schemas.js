const Joi = require("joi");


const id = Joi.number();
const genre = Joi.string().min(3).max(15);


const createGenreSchema = Joi.object({
  genre: genre.required(),
})

const updateGenreSchema = Joi.object({
  genre: genre,
})

const getGenreSchema = Joi.object({
  id: id.required()
})



module.exports = {createGenreSchema, updateGenreSchema,getGenreSchema}
