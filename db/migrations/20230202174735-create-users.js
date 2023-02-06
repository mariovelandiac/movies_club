'use strict';



const {USER_TABLE} = require('./../models/user.model');
const {CommentSchema, COMMENT_TABLE} = require('./../models/comment.model');
const {DirectorSchema, DIRECTOR_TABLE} = require('./../models/director.model');
const {GenreSchema, GENRE_TABLE} = require('./../models/genre.model');
const {MovieSchema, MOVIE_TABLE} = require('./../models/movies.model');
const {ProducerSchema, PRODUCER_TABLE} = require('./../models/producer.model');
const {ActorSchema, ACTOR_TABLE} = require('./../models/actor.model');
const {CustomerSchema, CUSTOMER_TABLE} = require('./../models/customer.model');
const {ActorMovieSchema, ACTOR_MOVIE_TABLE} = require('./../models/actor_movie.model');
const {UserMovieSchema, USER_MOVIE_TABLE} = require('./../models/user_movie.model');
const {GenreMovieSchema, GENRE_MOVIE_TABLE} = require('./../models/genre_movie.model');
const {DataTypes, Sequelize} = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // CREAR TABALA, migracion
  async up (queryInterface) {
    await queryInterface.createTable(DIRECTOR_TABLE, DirectorSchema);
    await queryInterface.createTable(PRODUCER_TABLE, ProducerSchema);
    await queryInterface.createTable(MOVIE_TABLE, MovieSchema);
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
    await queryInterface.createTable(COMMENT_TABLE, CommentSchema);
    await queryInterface.createTable(GENRE_TABLE, GenreSchema);
    await queryInterface.createTable(ACTOR_TABLE, ActorSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(ACTOR_MOVIE_TABLE, ActorMovieSchema);
    await queryInterface.createTable(USER_MOVIE_TABLE, UserMovieSchema);
    await queryInterface.createTable(GENRE_MOVIE_TABLE, GenreMovieSchema);
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
