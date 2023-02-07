// Vínculo con la aplicación
const express = require("express");
const router = express.Router();

// Capa de Autenticación
const passport = require('passport');
const {checkRole, checkIdentity, checkRoleCreation} = require('./../middlewares/auth.handler');

// Capa de validación de datos de entrada
const validatorHandler = require("../middlewares/validator.handler")
const {createUserSchema, updateUserSchema,getUserSchema, addMovieSchema, updateMovieSchema}
 = require("../schemas/users.schemas");

// Servicios
const UsersService = require('../services/users.services');
const service = new UsersService();


// RUTAS
router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkRole('admin'),
  async (req, res) => {
  const users = await service.find();
  res.json(users);
  }
);

// ruta para endpoint de actor/actriz en partícular
router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRole('admin', 'customer'),
  validatorHandler(getUserSchema,'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const user = await service.findOne(id)
      res.json(user)
    } catch (e) {
      next(e);
    }
});


router.post('/',
  validatorHandler(createUserSchema, 'body'),
  checkRoleCreation('customer'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
        res.status(201).json(newUser);
    } catch (e) {
      next(e)
    }
});

router.post('/add-movie',
  passport.authenticate('jwt', {session: false}),
  checkRole('admin','customer'),
  validatorHandler(addMovieSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.addMovie(body);
        res.status(201).json(newUser);
    } catch (e) {
      next(e)
    }
});

router.post('/:id', async (req, res) => {
  res.status(405).send("action not allowed")
});

router.patch('/update-movie/:id',
  passport.authenticate('jwt', {session: false}),
  checkRole('admin', 'customer'),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateMovieSchema, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const user = await service.updateMovie(id, body)
        res.json(user)
      } catch (e) {
        next(e)
      }
});

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRole('admin', 'customer'),
  checkIdentity(),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const user = await service.update(id, body)
        res.json(user)
      } catch (e) {
        next(e)
      }
});



router.delete('/delete-movie/:id',
  passport.authenticate('jwt', {session: false}),
  checkRole('admin', 'customer'),
  validatorHandler(getUserSchema, 'params'),
  async (req, res,next) => {
    try {
      const {id} = req.params;
      const user =  await service.removeMovie(id)
      res.json(user)
    } catch (e) {
      next(e)
    }
});

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRole('admin', 'customer'),
  checkIdentity(),
  validatorHandler(getUserSchema, 'params'),
  async (req, res,next) => {
    try {
      const {id} = req.params;
      const user =  await service.delete(id)
      res.json(user)
    } catch (e) {
      next(e)
    }
});


module.exports = router;
