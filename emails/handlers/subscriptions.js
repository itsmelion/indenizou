const Boom = require('boom');
const Customer = require('../models/customer.model');
const Mailchimp = require('./mailchimp-api');

exports.subscribe = async (req, res) => {
  let subscriber;

  subscriber = await Mailchimp.subscribeUser(req.body)
    .catch(({ status: n }) => res.status(n).json(Boom.boomify(subscriber, { statusCode: n })));

  const { status, id, unique_email_id } = subscriber;

  subscriber = await Customer.create(Object.assign(req.body, { mailchimp: { id, unique_email_id, status } }))
    .catch(e => res.status(400).json(Boom.badRequest(e)));

  return res.status(201).json(subscriber);
};

exports.subscribers = async (req, res) => {
  const customer = await Customer.find().lean();
  return res.json(customer);
};
