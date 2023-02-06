const express = require("express");
const ProducersServices = require('../services/producers.services')
const router = express.Router();
const service = new ProducersServices();
const validatorHandler = require("../middlewares/validator.handler")
const {createProducerSchema, updateProducerSchema,getProducerSchema}
 = require("../schemas/producers.schemas");

// ruta para endpoint de productoras

router.get('/', async (req,res) => {
  const producers = await service.find();
  res.json(producers);
})

// ruta para endpoint de una productora en particular
router.get('/:id',
  validatorHandler(getProducerSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const producer = await service.findOne(id)
      res.json(producer)
    } catch (e) {
      next(e);
    }
});

router.post('/',
  validatorHandler(createProducerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProducer = await service.create(body);
      res.status(201).json(newProducer);
    } catch (e) {
      next(e)
    }
})

router.post('/:id', async (req, res) => {
  res.status(405).send("action not allowed")
})

router.patch('/:id',
  validatorHandler(getProducerSchema, 'params'),
  validatorHandler(updateProducerSchema, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const producer = await service.update(id, body)
      res.json(producer)
    } catch (e) {
      next(e);
    }
  })

router.delete('/:id',
  validatorHandler(getProducerSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const producer =  await service.delete(id)
      res.json(producer)
    } catch (e) {
      next(e)
    }
 })

module.exports = router;
