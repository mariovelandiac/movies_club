const boom = require("@hapi/boom");
const { models } = require('./../libs/sequelize')


class CommentsService {
  constructor() {
  }

  generate() {
  }

  async create(data) {
    const newComment = await models.Comment.create(data)
    return newComment
  }

  async find() {
    const comments = await models.Comment.findAll();
    return comments;
  }

  async findOne(id) {
    const comment = await models.Comment.findByPk(id)
    if (!comment) {
      throw boom.notFound('comment not found')
    }
    return comment
  }

  async update(id, changes) {
    const comment = await this.findeOne(id);
    const rta = await comment.update(changes);
    return rta
  }

  async delete(id) {
    const comment = await this.findeOne(id);
    comment.destroy();
    return {id}
  }
}

module.exports = CommentsService
