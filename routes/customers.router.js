const express = require("express");
const router = express.Router();
const CustomersService = require('../services/customers.services');
const service = new CustomersService();
const validatorHandler = require("../middlewares/validator.handler")
const {createCustomerSchema, updateCustomerSchema,getCustomerSchema}
 = require("../schemas/customer.schemas");


// ruta para endpoint de actores

router.get('/', async (req, res) => {
  const customer = await service.find();
  res.json(customer);
})

// ruta para endpoint de actor/actriz en partícular
router.get('/:id',
  validatorHandler(getCustomerSchema,'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const customer = await service.findOne(id)
      res.json(customer)
    } catch (e) {
      next(e);
    }
});


router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
        res.status(201).json(newCustomer);
    } catch (e) {
      next(e)
    }
})

router.post('/:id', async (req, res) => {
  res.status(405).send("action not allowed")
})

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const customer = await service.update(id, body)
        res.json(customer)
      } catch (e) {
        next(e)
      }
});

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res,next) => {
    try {
      const {id} = req.params;
      const customer =  await service.delete(id)
      res.json(customer)
    } catch (e) {
      next(e)
    }
})


module.exports = router;

