const Boom = require('boom');
const log = require('../log');
const Customer = require('../models/customer.model');

exports.saveData = async function saveData(req, res) {
  const mappedData = {
    chatID: req.chatID,
    email: req['SYSTEM.CLIENT_EMAIL'] || req['formulario.email'],
    name: req['SYSTEM.CLIENT_NAME'],
    phone: req['SYSTEM.CLIENT_NUMBER'] || req['formulario.phone'],
    contactby: req['formulario.contactby'],
    indication: {
      contactby: req['indicacao.contactby'],
      email: req['indicado_email.email'],
      phone: req['indicacao.phone'],
    },
  };

  const notFound = (e) => {
    log.error('Customer not Found');
    return res.status(404).json(Boom.notFound('Customer not Found', e));
  };

  const customer = await Customer.findOne({ email: mappedData.email })
    .catch(e => notFound(e));

  if (!customer) notFound();

  const savedCustomer = await customer.set({ ...customer, ...mappedData }).save()
    .catch((e) => {
      log.error('Internal Error at saving entity on DB');
      return res.send(Boom.internal('Internal Error at saving entity on DB', e))
    });

  return res.status(201).json(savedCustomer);
};
