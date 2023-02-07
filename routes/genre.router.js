// Vínculo con la aplicación
const express = require("express");
const router = express.Router();

// Capa de Autenticación
const passport = require('passport');
const {checkRole} = require('./../middlewares/auth.handler');

// Capa de Validación de datos de entrada
const validatorHandler = require("../middlewares/validator.handler")
const {createGenreSchema, updateGenreSchema,getGenreSchema}
 = require("../schemas/genre.schemas");

// Servicios
const GenreService = require('../services/genre.services');
const service = new GenreService();


// ruta para endpoint de Genres
router.get('/', async (req, res) => {
  const genre = await service.find();
  res.json(genre);
})

// ruta para endpoint de actor/actriz en partícular
router.get('/:id',
  validatorHandler(getGenreSchema,'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const genre = await service.findOne(id)
      res.json(genre)
    } catch (e) {
      next(e);
    }
});


router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRole('admin'),
  validatorHandler(createGenreSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newGenre = await service.create(body);
        res.status(201).json(newGenre);
    } catch (e) {
      next(e)
    }
})

router.post('/:id', async (req, res) => {
  res.status(405).send("action not allowed")
})

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRole('admin'),
  validatorHandler(getGenreSchema, 'params'),
  validatorHandler(updateGenreSchema, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const genre = await service.update(id, body)
        res.json(genre)
      } catch (e) {
        next(e)
      }
});

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRole('admin'),
  validatorHandler(getGenreSchema, 'params'),
  async (req, res,next) => {
    try {
      const {id} = req.params;
      const genre =  await service.delete(id)
      res.json(genre)
    } catch (e) {
      next(e)
    }
})


module.exports = router;
