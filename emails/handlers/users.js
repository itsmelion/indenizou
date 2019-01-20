const Boom = require('boom');
const Users = require('../models/user');

exports.userSettings = async (req, res) => {
  const _id = req.params.user;
  const user = await Users.findOne({ _id }).lean();
  return res.json(user);
};

exports.createUser = async (req, res) => {
  const user = await Users.create(req.body)
    .catch(e => res.status(400).json(Boom.badRequest(e)));
  return res.status(201).json(user.id);
};