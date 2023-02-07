'use strict';



const {USER_TABLE} = require('./../models/user.model');
const {COMMENT_TABLE} = require('./../models/comment.model');
const {DIRECTOR_TABLE} = require('./../models/director.model');
const {GENRE_TABLE} = require('./../models/genre.model');
const {MOVIE_TABLE} = require('./../models/movies.model');
const {PRODUCER_TABLE} = require('./../models/producer.model');
const {ACTOR_TABLE} = require('./../models/actor.model');
const {CUSTOMER_TABLE} = require('./../models/customer.model');
const {ACTOR_MOVIE_TABLE} = require('./../models/actor_movie.model');
const {USER_MOVIE_TABLE} = require('./../models/user_movie.model');
const {GENRE_MOVIE_TABLE} = require('./../models/genre_movie.model');
const {DataTypes, Sequelize} = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // CREAR TABALA, migracion
  async up (queryInterface) {
    await queryInterface.createTable(DIRECTOR_TABLE, {
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
    });
    await queryInterface.createTable(PRODUCER_TABLE, {
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
    });
    await queryInterface.createTable(MOVIE_TABLE, {
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
    });
    await queryInterface.createTable(USER_TABLE, {
      id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    login: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    nickname: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'customer'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW
    }
  });
    await queryInterface.createTable(COMMENT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      calification: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      comment: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      userId: {
        field: 'user_id',
        allowNull: false,
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
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: MOVIE_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
    await queryInterface.createTable(GENRE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      genre: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    });
    await queryInterface.createTable(ACTOR_TABLE, {
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
    });
    await queryInterface.createTable(CUSTOMER_TABLE, {
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
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "last_name"
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        references: {
          model: USER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
    await queryInterface.createTable(ACTOR_MOVIE_TABLE, {
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
    });
    await queryInterface.createTable(USER_MOVIE_TABLE, {
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
    });
    await queryInterface.createTable(GENRE_MOVIE_TABLE, {
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
    });
  },

  // BORRAR TABLA
  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(COMMENT_TABLE);
    await queryInterface.dropTable(DIRECTOR_TABLE);
    await queryInterface.dropTable(GENRE_TABLE);
    await queryInterface.dropTable(MOVIE_TABLE);
    await queryInterface.dropTable(PRODUCER_TABLE);
    await queryInterface.dropTable(ACTOR_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(ACTOR_MOVIE_TABLE);
    await queryInterface.dropTable(USER_MOVIE_TABLE);
    await queryInterface.dropTable(GENRE_MOVIE_TABLE);
  }
};
