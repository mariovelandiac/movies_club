// Vínculo con la aplicación
const express = require("express");
const router = express.Router();

// Capa de Autenticación
const passport = require('passport');
const {checkRole} = require('./../middlewares/auth.handler');

// Capa de validación de formato de entrada
const validatorHandler = require("../middlewares/validator.handler")
const {createDirectorSchema, updateDirectorSchema,getDirectorSchema}
 = require("../schemas/directors.schemas");

//Servicios
const DirectorsServices = require("../services/directors.services")
const service = new DirectorsServices();


// ruta para endpoint de Directores
router.get('/', async (req,res) => {
  const directors = await service.find();
  res.json(directors);
})

// ruta para endpoint de un director en particular

router.get('/:id',
  validatorHandler(getDirectorSchema,'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const director = await service.findOne(id)
      res.json(director)
    } catch (e) {
      next(e);
    }
})

router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRole('admin'),
  validatorHandler(createDirectorSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newDirector = await service.create(body);
        res.status(201).json(newDirector);
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
  validatorHandler(getDirectorSchema, 'params'),
  validatorHandler(updateDirectorSchema, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const director = await service.update(id, body)
        res.json(director)
      } catch (e) {
      next(e)
    }
})

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRole('admin'),
  validatorHandler(getDirectorSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const director =  await service.delete(id)
      res.json(director)
    } catch (e) {
      next(e)
    }
})



module.exports = router;
