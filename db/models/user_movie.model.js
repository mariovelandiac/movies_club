const { Model, DataTypes, Sequelize} = require("sequelize");

const USER_MOVIE_TABLE = "user_movie"
const {USER_TABLE} = require('./user.model')
const {MOVIE_TABLE} = require('./movies.model')
const UserMovieSchema = {
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
  watched: {
    allowNull: false,
    defaultValue: false,
    type: DataTypes.BOOLEAN,
  },
  userId: {
    field: 'user_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
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

class UserMovie extends Model {
  static associate() {
    // model
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_MOVIE_TABLE,
      modelName: 'UserMovie',
      timestamps: false
    }
  }
}

module.exports = { USER_MOVIE_TABLE, UserMovieSchema, UserMovie }
