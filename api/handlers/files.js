const fs = require('fs');
const multer = require('multer');
const Boom = require('boom');
const Customer = require('../models/customer.model');

exports.storage = multer.diskStorage({
  destination: ({ params }, file, cb) => {
    const folder = `uploads/${params.id}`;

    if (!fs.existsSync(folder)) fs.mkdirSync(folder);

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

exports.save = ({ params, files }, res) => Customer
  .findById(params.id, (err, user) => {
    if (err) return res.status(500).json(Boom.internal(err));

    if (!user) return res.status(404).json(Boom.notFound('User not Found'));

    return res.status(201).end();
  });

exports.delete = ({ params }, res) => Customer
  .findById(params.id, (err, user) => {
    if (err) return res.status(500).json(Boom.internal(err));

    if (!user) return res.status(404).json(Boom.notFound('User not Found'));

    return res.send(user);
  });
