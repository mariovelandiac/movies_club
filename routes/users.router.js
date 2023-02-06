const express = require("express");
const router = express.Router();
const UsersService = require('../services/users.services');
const service = new UsersService();
const validatorHandler = require("../middlewares/validator.handler")
const {createUserSchema, updateUserSchema,getUserSchema, addMovieSchema, updateMovieSchema}
 = require("../schemas/users.schemas");



// ruta para endpoint de actores

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
})

// ruta para endpoint de actor/actriz en partícular
router.get('/:id',
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
