const express = require("express");
const passport = require('passport')
const router = express.Router();
const jwt = require('jsonwebtoken');
const {config} = require('./../config/config');


router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user
      const payload = {
        sub: user.id,
        role: user.role,
      }
      const token = jwt.sign(payload, config.jwtsecret)
      res.json({
        user,
        token
      })
    } catch (e) {
      next(e)
    }
})



module.exports = router;
