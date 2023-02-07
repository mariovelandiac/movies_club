// Vínculo con la aplicación
const express = require("express");
const router = express.Router();
// Capa de Autenticación
const passport = require('passport');
const MoviesServices = require('./../services/movies.services');
const service = new MoviesServices();



// RUTAS
router.get('/my-movies',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user
      const movies = await service.findByUser(user.sub);
      res.json(movies)
    } catch (error) {
        next(error)
    }
  }
);


module.exports = router;

