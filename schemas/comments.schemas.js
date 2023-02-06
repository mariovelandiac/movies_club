const Joi = require("joi");


const id = Joi.number();
const calification = Joi.number().integer().min(0).max(5);
const comment = Joi.string();
const userId = Joi.number();
const movieId = Joi.number();



const createCommentSchema = Joi.object({
  calification: calification.required(),
  comment: comment,
  userId: userId.required(),
  movieId: movieId.required()
})

const updateCommentSchema = Joi.object({
  calification: calification,
  comment: comment,
  userId: userId,
  movieId: movieId
})

const getCommentSchema = Joi.object({
  id: id.required()
})



module.exports = {createCommentSchema, updateCommentSchema,getCommentSchema}
