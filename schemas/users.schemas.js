const Joi = require("joi");


const id = Joi.number();
const login = Joi.string().min(3).max(50);
const password = Joi.string().min(8);
const nickname = Joi.string();
const email = Joi.string().email();
const role = Joi.string();
const watched = Joi.boolean();
const userId = Joi.number();
const movieId = Joi.number();


const createUserSchema = Joi.object({
  login: login.required(),
  password: password.required(),
  nickname: nickname,
  email: email.required(),
  role: role.required()
});

const addMovieSchema = Joi.object({
    watched: watched,
    userId: userId.required(),
    movieId: movieId.required(),
})

const updateMovieSchema = Joi.object({
  watched: watched
})

const updateUserSchema = Joi.object({
  login: login,
  password: password,
  nickname: nickname,
  email: email,
  role: role
});

const getUserSchema = Joi.object({
  id: id.required()
});



module.exports = {createUserSchema, updateUserSchema,getUserSchema, addMovieSchema, updateMovieSchema}
