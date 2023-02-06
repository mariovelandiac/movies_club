const boom = require("@hapi/boom");
const { models } = require('./../libs/sequelize')


class UsersService {
  constructor() {
  }

  generate() {

  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser
  }

  async addMovie(data) {
    const newMovie = await models.UserMovie.create(data);
    return newMovie
  }

  async find() {
    const users = await models.User.findAll({
      include: ['customer']
    });
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: ['customer', 'comments','movies']
    });
    if (!user) {
      throw boom.notFound('user not found')
    }
    return user
  }

  async findOneUserMovie (id) {
    const movieUser = await models.UserMovie.findByPk(id);
    if (!movieUser) {
      throw boom.notFound('this user does not have relationship with this movie');
    }
    return movieUser
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes)
    return rta
  }

  async updateMovie(id, changes) {
    const movieUser = await this.findOneUserMovie(id);
    const rta = await movieUser.update(changes)
    return rta
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return {id}
  }


  async removeMovie(id) {
    const movieUser = await this.findOneUserMovie(id);
    await movieUser.destroy(id);
    return {message: 'movie removed of your wish list'}
  }
}

module.exports = UsersService
