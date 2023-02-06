const boom = require("@hapi/boom");
const { models } = require('./../libs/sequelize')

class ActorsService {
  constructor() {
  }

  generate() {
  }

  async create(data) {
    const newActor = await models.Actor.create(data);
    return newActor
  }

  async find(query) {
    const options = {}
    const {limit, offset} = query
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const actors = await models.Actor.findAll(options);
    return actors
  }

  async findOne(id) {
    const actor = await models.Actor.findByPk(id, {
      include: 'movies'
    });
    if (!actor) {
      throw boom.notFound('actor not found');
    }
    return actor
  }

  async update(id, changes) {
    const actor = await this.findOne(id);
    const rta = await actor.update(changes);
    return rta
  }

  async delete(id) {
    const actor = await this.findOne(id);
    actor.destroy()
    return {id}
  }
}

module.exports = ActorsService
