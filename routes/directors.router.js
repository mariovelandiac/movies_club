const express = require("express");
const router = express.Router();
const DirectorsServices = require("../services/directors.services")
const service = new DirectorsServices();
const validatorHandler = require("../middlewares/validator.handler")
const {createDirectorSchema, updateDirectorSchema,getDirectorSchema}
 = require("../schemas/directors.schemas");
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
