const { UserSchema, User } = require('./user.model');
const { CommentSchema, Comment } = require('./comment.model');
const { DirectorSchema, Director } = require('./director.model');
const { GenreSchema, Genre } = require('./genre.model');
const { MovieSchema, Movie } = require('./movies.model');
const { ProducerSchema, Producer } = require('./producer.model');
const { ActorSchema, Actor } = require('./actor.model');
const { CustomerSchema, Customer } = require('./customer.model');
const { GenreMovieSchema, GenreMovie } = require('./genre_movie.model');
const { ActorMovieSchema, ActorMovie } = require('./actor_movie.model');
const { UserMovieSchema, UserMovie } = require('./user_movie.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Comment.init(CommentSchema, Comment.config(sequelize));
  Director.init(DirectorSchema, Director.config(sequelize));
  Genre.init(GenreSchema, Genre.config(sequelize));
  Movie.init(MovieSchema, Movie.config(sequelize));
  Producer.init(ProducerSchema, Producer.config(sequelize));
  Actor.init(ActorSchema, Actor.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  GenreMovie.init(GenreMovieSchema, GenreMovie.config(sequelize));
  ActorMovie.init(ActorMovieSchema, ActorMovie.config(sequelize));
  UserMovie.init(UserMovieSchema, UserMovie.config(sequelize));

  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
  Movie.associate(sequelize.models);
  Director.associate(sequelize.models);
  Producer.associate(sequelize.models);
  Genre.associate(sequelize.models);
  Actor.associate(sequelize.models);
  Comment.associate(sequelize.models);
}

module.exports = setupModels;
