const Boom = require('boom');
const Customer = require('../models/customer.model');

exports.save = ({ params, files }, res) => Customer
  .findById(params.id, (err, user) => {
    if (err) return res.status(500).json(Boom.internal(err));

    if (!user) return res.status(404).json(Boom.notFound('User not Found'));

    return res.json({ user, files });
  });

exports.delete = ({ params }, res) => Customer
  .findById(params.id, (err, user) => {
    if (err) return res.status(500).json(Boom.internal(err));

    if (!user) return res.status(404).json(Boom.notFound('User not Found'));

    return res.json(user);
  });
