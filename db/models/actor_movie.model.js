const { Model, DataTypes, Sequelize} = require("sequelize");

const ACTOR_MOVIE_TABLE = "actor_movies";

const {ACTOR_TABLE} = require('./actor.model');
const {MOVIE_TABLE} = require('./movies.model');

const ActorMovieSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  actorId: {
    field: 'actor_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ACTOR_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  movieId: {
    field: 'movie_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: MOVIE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}

class ActorMovie extends Model {
  static associate() {
    // model
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ACTOR_MOVIE_TABLE,
      modelName: 'ActorMovie',
      timestamps: false
    }
  }
}

module.exports = { ACTOR_MOVIE_TABLE, ActorMovieSchema, ActorMovie }
