const Boom = require('boom');
const Customer = require('../models/customer');
const Mailchimp = require('./mailchimp-api');

exports.subscribe = async (req, res) => {
  let subscriber, status;

  subscriber = await Mailchimp.subscribeUser(req.body)
    .catch(({ status: n }) => res.status(n).json(Boom.boomify(subscriber, { statusCode: n })));

  status = subscriber.status;

  subscriber = await Customer.create(req.body)
    .catch(e => res.status(400).json(Boom.badRequest(e)));

  return res.status(status).json(subscriber);
};

exports.subscribers = async (req, res) => {
  const customer = await Customer.find().lean();
  return res.json(customer);
};