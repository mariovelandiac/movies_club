const boom = require("@hapi/boom");
const { models } = require('./../libs/sequelize');
const bcrypt = require('bcrypt');

class CustomersService {
  constructor() {
  }

  generate() {
  }

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
    user: {
      ...data.user,
      password: hash
    }}
    const newCustomer = await models.Customer.create(newData, {
      include: ['user']
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer
  }

  async find() {
    const customers = await models.Customer.findAll({
      include: ['user']
      }
    );
    // delete customers.dataValues.user.dataValues.password
    customers.forEach((customer)=>{
      delete customer.dataValues.user.dataValues.password
      return
    })
    return customers
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta
  }

  async delete(id) {
    const customer = await this.findOne(id);
    customer.destroy()
    return {id}
  }
}

module.exports = CustomersService
