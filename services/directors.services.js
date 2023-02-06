const boom = require("@hapi/boom");
const { models } = require('./../libs/sequelize')

class DirectorsServices {
  constructor() {
  }

  async create(data) {
    const newDirector = await models.Director.create(data);
    return newDirector;
  }

  async generate() {
  }

  async find() {
    const directors = await models.Director.findAll();
    return directors
  }

  async findOne(id) {
    const director = await models.Director.findByPk(id, {
      include: 'movies'
    });
    if (!director) {
      throw boom.notFound('director not found')
    }
    return director
  }

  async update(id, changes) {
    const director = await this.findOne(id);
    const rta = await director.update(changes)
    return rta
  }

  async delete(id) {
    const director = await this.findOne(id);
    director.destroy();
    return {id}
  }
}

module.exports = DirectorsServices;
