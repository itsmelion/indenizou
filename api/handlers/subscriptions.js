const Boom = require('boom');
const { groupBy } = require('lodash');
const Customer = require('../models/customer.model');
const Mailchimp = require('./mailchimp-api');
const config = require('../config');

exports.subscribe = async (req, res) => {
  const { sandbox } = req.body;
  const chimpData = null;
  let subscriber;

  if (!sandbox) {
    subscriber = await Mailchimp.subscribeUser(req.body)
      .catch(({ status: n }) => res.status(n).json(Boom.boomify(subscriber, { statusCode: n })));

    chimpData.mailchimp.status = subscriber.status;
    chimpData.mailchimp.id = subscriber.id;
    chimpData.mailchimp.unique_email_id = subscriber.unique_email_id;
  }

  subscriber = await Customer.create(Object.assign(
    req.body,
    chimpData,
  ))
    .catch(e => res.status(400).json(Boom.badRequest(e)));

  return res.status(201).json(subscriber);
};

exports.subscribers = async (req, res) => {
  const customer = await Customer.find().lean();
  return res.json(customer);
};

exports.byStatus = async (req, res) => {
  const customer = await Customer.find().lean();
  return res.json(groupBy(customer, 'status'));
};

exports.status = (req, res) => res.json(config.pipelines);
