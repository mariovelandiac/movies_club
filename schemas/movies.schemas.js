const Joi = require("joi");
const today = new Date();
const yearToday = today.getFullYear();


const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const year = Joi.number().integer().min(1900).max(yearToday);
const rating = Joi.number();
const duration = Joi.number().integer().min(20).max(240);
const description = Joi.string();
const image = Joi.string();
const directorId = Joi.number().integer();
const producerId = Joi.number().integer();
const genreId = Joi.number().integer();
const actorId = Joi.number().integer();
const limit = Joi.number();
const offset = Joi.number();
const rating_min = Joi.number();
const rating_max = Joi.number();


const createMovieSchema = Joi.object({
  name: name.required(),
  year: year.required(),
  rating: rating.required(),
  duration: duration.required(),
  description: description.required(),
  image: image.required(),
  directorId: directorId.required(),
  producerId: producerId.required()
})

const updateMovieSchema = Joi.object({
  name: name,
  year: year,
  rating: rating,
  duration: duration,
  description: description,
  image: image,
  directorId: directorId,
  producerId: producerId
})

const getMovieSchema = Joi.object({
  id: id.required()
});

const addGenreSchema = Joi.object({
  genreId: genreId.required(),
  movieId: id.required(),
});

const addActorSchema = Joi.object({
  actorId: actorId.required(),
  movieId: id.required(),
});

const querySchema = Joi.object({
  limit: limit,
  offset: offset,
  rating: rating,
  rating_min,
  rating_max: rating_max.when('rating_min', {
    is: Joi.number().required(),
    then: Joi.required()
  })
})

module.exports = {createMovieSchema, updateMovieSchema,getMovieSchema,
  addGenreSchema, addActorSchema, querySchema}
