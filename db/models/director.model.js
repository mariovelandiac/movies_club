const { Model, DataTypes, Sequelize} = require("sequelize");

const DIRECTOR_TABLE = "directors"

const DirectorSchema = {
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
  gender: {
    allowNull: true,
    type: DataTypes.STRING
  },
  biography: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Director extends Model {
  static associate(models) {
    this.hasMany(models.Movie, {
      as: 'movies',
      foreignKey: 'directorId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DIRECTOR_TABLE,
      modelName: 'Director',
      timestamps: false
    }
  }
}

module.exports = { DIRECTOR_TABLE, DirectorSchema, Director }
