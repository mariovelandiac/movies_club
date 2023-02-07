// Conexión con la aplicación
const express = require("express");
const router = express.Router();


// capa de autenticación
const passport = require('passport')


// Services
const AuthService = require('./../services/auth.services');
const service = new AuthService();

// Capa de validación de datos

const {getEmailSchema} = require('./../schemas/email.schema');
const validatorHandler = require("../middlewares/validator.handler");

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user
      const response = service.signToken(user)
      res.json(response)
    } catch (e) {
      next(e)
    }
})

router.post('/recovery',
  validatorHandler(getEmailSchema, 'body'),
  async (req, res, next) => {
    try {
      const {email} = req.body;
      const rta = await service.sendMail(email);
      res.status(200).json(rta)

    } catch (e) {
      next(e)
    }
})



module.exports = router;
