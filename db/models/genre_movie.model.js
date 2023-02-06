const { Model, DataTypes, Sequelize} = require("sequelize");
const {GENRE_TABLE} = require('./genre.model');
const {MOVIE_TABLE} = require('./movies.model');

const GENRE_MOVIE_TABLE = "genre_movies"

const GenreMovieSchema = {
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
  genreId: {
    field: 'genre_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: GENRE_TABLE,
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

class GenreMovie extends Model {
  static associate() {
    // model
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: GENRE_MOVIE_TABLE,
      modelName: 'GenreMovie',
      timestamps: false
    }
  }
}

module.exports = { GENRE_MOVIE_TABLE, GenreMovieSchema, GenreMovie }
