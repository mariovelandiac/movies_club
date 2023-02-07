// Vínculo con la aplicación
const express = require("express");
const router = express.Router();

// Capa de Autenticación
const passport = require('passport');
const {checkRole} = require('./../middlewares/auth.handler');

//Validación de datos de ingreso
const validatorHandler = require("../middlewares/validator.handler")
const {createCustomerSchema, updateCustomerSchema,getCustomerSchema}
 = require("../schemas/customer.schemas");

// Servicios
const CustomersService = require('../services/customers.services');
const service = new CustomersService();



// RUTAS

router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkRole('admin'),
  async (req, res) => {
  const customer = await service.find();
  res.json(customer);
  }
);

// ruta para endpoint de actor/actriz en partícular
router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRole('admin','customer'),
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
  passport.authenticate('jwt', {session: false}),
  checkRole('customer'),
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
  passport.authenticate('jwt', {session: false}),
  checkRole('admin', 'customer'),
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

