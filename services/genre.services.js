const boom = require("@hapi/boom");
const { models } = require('./../libs/sequelize')


class GenreService {
  constructor() {
  }

  generate() {
  }

  async create(data) {
    const newGenre = await models.Genre.create(data)
    return newGenre
  }

  async find() {
    const genre = await models.Genre.findAll();
    return genre;
  }

  async findOne(id) {
    const genre = await models.Genre.findByPk(id, {
      include: 'movies'
    })
    if (!genre) {
      throw boom.notFound('genre not found')
    }
    return genre
  }

  async update(id, changes) {
    const genre = await this.findeOne(id);
    const rta = await genre.update(changes);
    return rta
  }

  async delete(id) {
    const genre = await this.findeOne(id);
    genre.destroy();
    return {id}
  }
}

module.exports = GenreService
