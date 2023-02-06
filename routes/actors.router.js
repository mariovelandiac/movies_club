const express = require("express");
const router = express.Router();
const ActorsService = require('../services/actors.services');
const service = new ActorsService();
const validatorHandler = require("../middlewares/validator.handler")
const {createActorSchema, updateActorSchema,getActorSchema}
 = require("../schemas/actors.schemas");
const {querySchema} = require('./../schemas/actors.schemas')

// ruta para endpoint de actores

router.get('/',
  validatorHandler(querySchema, 'query'),
  async (req, res) => {
    const actors = await service.find(req.query);
    res.json(actors);
  })

// ruta para endpoint de actor/actriz en partícular
router.get('/:id',
  validatorHandler(getActorSchema,'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const actor = await service.findOne(id)
      res.json(actor)
    } catch (e) {
      next(e);
    }
});


router.post('/',
  validatorHandler(createActorSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newActor = await service.create(body);
        res.status(201).json(newActor);
    } catch (e) {
      next(e)
    }
})

router.post('/:id', async (req, res) => {
  res.status(405).send("action not allowed")
})

router.patch('/:id',
  validatorHandler(getActorSchema, 'params'),
  validatorHandler(updateActorSchema, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const actor = await service.update(id, body)
        res.json(actor)
      } catch (e) {
        next(e)
      }
});

router.delete('/:id',
  validatorHandler(getActorSchema, 'params'),
  async (req, res,next) => {
    try {
      const {id} = req.params;
      const actor =  await service.delete(id)
      res.json(actor)
    } catch (e) {
      next(e)
    }
})


module.exports = router;
