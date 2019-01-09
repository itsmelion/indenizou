const mongoose = require('mongoose');
const shortid = require('shortid');

const schema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },

  name: { type: String, trim: true },
  email: { type: String, lowercase: true, trim: true, unique: true },
  phone: { type: String, lowercase: true, trim: true, unique: true },
  outro: { type: String },
  contactby: { type: String },
  assunto: {
    type: String,
    enum: ['cancelamento', 'outros', 'extravio de bagagem', 'atraso', 'overbooking'],
    required: [true, 'É necessário fornecer o assunto']
  }

}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('Customer', schema);
