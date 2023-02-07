const boom = require("@hapi/boom");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {config} = require('./../config/config');
const nodemailer = require('nodemailer');

//servicios externos
const UserServices = require('./users.services');
const service = new UserServices();

class AuthService {

  async existsUser(email) {
    const user = await service.findByEmail(email);
      // validación de existencia
      if (!user) {
        throw boom.unauthorized();
      }
      return user
  }

  async getUser(email, password) {
    const user = await this.existsUser(email)
    // validación de correspondencia
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized(), false;
    }
    delete user.dataValues.password
    return user
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtsecret)
    return {
      user,
      token
    }
  }

  async sendMail(email) {
    const user = await this.existsUser(email)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
          user: config.mailuser,
          pass: config.mailpassword
      }
    });
    await transporter.sendMail({
      from: config.mailuser, // sender address
      to: `${user.email}`, // list of receivers
      subject: `Hola, ${user.nickname}, ¿Olvidaste tu contraseña?`, // Subject line
      text: 'ajatuque', // plain text body
      html: "<b>Tranquilo, en este link podrás recuperarla</b>", // html body
    });
    return { message: 'mail sent'}
  }
}

module.exports = AuthService
