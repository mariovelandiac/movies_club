const boom = require("@hapi/boom");
const { models } = require('./../libs/sequelize')
const {Op} = require('sequelize')

class MoviesServices {
  constructor() {
  };

  generate() {
  };

  async create(data) {
    const newMovie = await models.Movie.create(data);
    return newMovie;
  };

  async addActor(data) {
    const newActorMovie = await models.ActorMovie.create(data);
    return newActorMovie;
  };

  async addGenre(data) {
    const newGenreMovie = await models.GenreMovie.create(data);
    return newGenreMovie;
  };

  async find(query) {
    const options = {
      include: ['director', 'producer'],
      where: {}
    }
    // query de paginación
    const {limit, offset} = query
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    // query de rating igual a
    const {rating} = query
    if (rating) {
      options.where.rating = rating
    }
    // query de rating entre dos valores
    const { rating_min, rating_max } = query;
    if (rating_min && rating_max) {
      options.where.rating = {
        [Op.gte]: rating_min,
        [Op.lte]: rating_max
      }
    }
    const movies = await models.Movie.findAll(options);
    return movies;
  };

  async findeOne(id) {
    const movie = await models.Movie.findByPk(id, {
      include: ['director', 'producer','genre','actors','comments']
    })
    if (!movie) {
      throw boom.notFound('movie not found')
    }
    return movie
  };

  async update(id, changes) {
    const movie = await this.findeOne(id);
    const rta = await movie.update(changes);
    return rta;
  };

  async delete(id) {
    const movie = await this.findeOne(id);
    movie.destroy();
    return {id};
  };
};

module.exports = MoviesServices;
