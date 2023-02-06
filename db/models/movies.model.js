const { Model, DataTypes, Sequelize} = require("sequelize");
const {PRODUCER_TABLE} = require('./producer.model');
const {DIRECTOR_TABLE} = require('./director.model');

const MOVIE_TABLE = "movies"

const MovieSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  year: {
    allowNull: false,
    type: DataTypes.DATE
  },
  rating: {
    allowNull: false,
    type: DataTypes.DECIMAL(2,1)
  },
  duration: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  directorId: {
    field: 'director_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: DIRECTOR_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  producerId: {
    field: 'producer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}

class Movie extends Model {
  static associate(models) {
    this.belongsTo(models.Director, {as: 'director'});
    this.belongsTo(models.Producer, {as: 'producer'});
    this.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'movieId'
    });
    this.belongsToMany(models.Genre, {
      as: 'genre',
      through: models.GenreMovie,
      foreignKey: 'movieId',
      otherKey: 'genreId'
    });
    this.belongsToMany(models.Actor, {
      as: 'actors',
      through: models.ActorMovie,
      foreignKey: 'movieId',
      otherKey: 'actorId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIE_TABLE,
      modelName: 'Movie',
      timestamps: false
    }
  }
}

module.exports = { MOVIE_TABLE, MovieSchema, Movie }
