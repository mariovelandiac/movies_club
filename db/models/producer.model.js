const { Model, DataTypes, Sequelize} = require("sequelize");

const PRODUCER_TABLE = "producers"

const ProducerSchema = {
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

class Producer extends Model {
  static associate(models) {
    this.hasMany(models.Movie, {
      as: 'movies',
      foreignKey: 'producerId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCER_TABLE,
      modelName: 'Producer',
      timestamps: false
    }
  }
}

module.exports = { PRODUCER_TABLE, ProducerSchema, Producer }
