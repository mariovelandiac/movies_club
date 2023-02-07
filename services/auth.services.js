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
    const token = jwt.sign(payload, config.jwtsecret);
    delete user.dataValues.recoveryToken
    return {
      user,
      token
    }
  }

  async sendRecovery(email) {
    const user = await this.existsUser(email);
    const payload = { sub: user.id};
    const token = jwt.sign(payload, config.jwtRecovery, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?${token}`
    await service.update(user.id, {recoveryToken: token});
    const mail = {
    from: config.mailuser, // sender address
    to: `${user.email}`, // list of receivers
    subject: `Hola, ${user.nickname}, ¿Olvidaste tu contraseña?`, // Subject line
    html: `<b>Tranquil@, en este link podrás recuperarla</b>
            <br> Solo da clic aquí => ${link}`,
    };
    const rta = await this.sendMail(mail)
    return rta
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtRecovery);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {
        recoveryToken: null,
        password: hash
      });
      return {message: 'password changed'}
    } catch (e) {
        throw boom.unauthorized();
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
          user: config.mailuser,
          pass: config.mailpassword
      }
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent'}
  }
}

module.exports = AuthService
