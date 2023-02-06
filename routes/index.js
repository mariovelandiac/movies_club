const express = require("express")
const moviesRouter = require("./movies.router.js");
const directorsRouter = require("./directors.router");
const producersRouter = require("./producers.router");
const actorsRouter = require("./actors.router");
const genreRouter = require("./genre.router");
const usersRouter = require("./users.router");
const commentsRouter = require("./comments.router");
const customersRouter = require("./customers.router");;

function routerApi(app) {
  const router = express.Router();
  app.get('/', (req, res)=> {
    res.send("¡Bienvenido!")
  })
  app.get('/api/v1', (req, res)=> {
    res.send("¡Bienvenido!")
  })
  app.use('/api/v1', router)
  router.use('/movies',moviesRouter);
  router.use('/directors',directorsRouter);
  router.use('/producers',producersRouter);
  router.use('/actors',actorsRouter);
  router.use('/genre', genreRouter);
  router.use('/users',usersRouter);
  router.use('/comments',commentsRouter);
  router.use('/customers',customersRouter);
}

module.exports = routerApi;
