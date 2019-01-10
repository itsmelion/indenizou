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
    enum: ['cancelamento', 'atraso', 'overbooking', 'extravio de bagagem', 'outros'],
    required: [true, 'É necessário fornecer o assunto']
  },
  tags: { type: Array },

  id: { type: String },
  unique_email_id: { type: String },
  status: {
    type: String,
    enum: ['subscribed', 'unsubscribed', 'cleaned', 'pending', 'transactional'],
    required: [true, 'É necessário fornecer o status de inscricao'],
  },

}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('Customer', schema);
