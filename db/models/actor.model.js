const { Model, DataTypes, Sequelize} = require("sequelize");

const ACTOR_TABLE = "actors"

const ActorSchema = {
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
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Actor extends Model {
  static associate(models) {
    this.belongsToMany(models.Movie, {
      as: 'movies',
      through: models.ActorMovie,
      foreignKey: 'actorId',
      otherKey: 'movieId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ACTOR_TABLE,
      modelName: 'Actor',
      timestamps: false
    }
  }
}

module.exports = { ACTOR_TABLE, ActorSchema, Actor }
