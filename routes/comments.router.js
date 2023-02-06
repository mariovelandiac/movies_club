const express = require("express");
const router = express.Router();
const CommentsService = require('../services/comments.services');
const service = new CommentsService();
const validatorHandler = require("../middlewares/validator.handler")
const {createCommentSchema, updateCommentSchema,getCommentSchema}
 = require("../schemas/comments.schemas");


// ruta para endpoint de actores

router.get('/', async (req, res) => {
  const comment = await service.find();
  res.json(comment);
})

// ruta para endpoint de actor/actriz en partícular
router.get('/:id',
  validatorHandler(getCommentSchema,'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const comment = await service.findOne(id)
      res.json(comment)
    } catch (e) {
      next(e);
    }
});


router.post('/',
  validatorHandler(createCommentSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newComment = await service.create(body);
        res.status(201).json(newComment);
    } catch (e) {
      next(e)
    }
});

router.post('/:id', async (req, res) => {
  res.status(405).send("action not allowed")
})

router.patch('/:id',
  validatorHandler(getCommentSchema, 'params'),
  validatorHandler(updateCommentSchema, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const comment = await service.update(id, body)
        res.json(comment)
      } catch (e) {
        next(e)
      }
});

router.delete('/:id',
  validatorHandler(getCommentSchema, 'params'),
  async (req, res,next) => {
    try {
      const {id} = req.params;
      const comment =  await service.delete(id)
      res.json(comment)
    } catch (e) {
      next(e)
    }
})


module.exports = router;

