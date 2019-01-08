const bluebird = require('bluebird');
const mongoose = require('mongoose');
const shortid = require('shortid');

mongoose.connect(process.env.DB_URL, { promiseLibrary: bluebird, useNewUrlParser: true });
const schema = new mongoose.Schema({
  id: { type: String, default: shortid.generate },

  name: { type: String, trim: true },
  email: { type: String, lowercase: true, trim: true, unique: true },
  phone: { type: String, lowercase: true, trim: true, unique: true },
  outro: { type: String },
  contactby: { type: String },
  assunto: {
    type: String,
    enum: ['cancelamento', 'outros', 'bagagem', 'atraso', 'overbooking'],
    required: [true, 'É necessário fornecer o assunto']
  }

}, { versionKey: false, timestamps: true, _id: false });

module.exports = mongoose.model('Customer', schema);
