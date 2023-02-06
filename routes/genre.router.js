const express = require("express");
const router = express.Router();
const GenreService = require('../services/genre.services');
const service = new GenreService();
const validatorHandler = require("../middlewares/validator.handler")
const {createGenreSchema, updateGenreSchema,getGenreSchema}
 = require("../schemas/genre.schemas");


// ruta para endpoint de GenreSs

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
