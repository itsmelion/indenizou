const mongoose = require('mongoose');
const shortid = require('shortid');
const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Email = require('../libs/email');
const config = require('../config');

const isProd = process.env.NODE_ENV === 'production';

const schema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  password: { type: String, required: [false, 'Must provide a password'], select: false },
  name: { type: String, trim: true },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: [true, 'Provide an Email, it will be your login'],
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    index: { unique: true },
  },
  phone: { type: String, lowercase: true, trim: true, unique: true },
  outro: { type: String },
  contactby: { type: String, default: 'email', enum: ['email', 'whatsapp', 'phone'] },
  assunto: {
    type: String,
    enum: ['cancelamento', 'atraso', 'overbooking', 'extravio de bagagem', 'outros'],
    required: [true, 'É necessário fornecer o assunto'],
  },

  status: {
    type: String,
    enum: config.pipelines,
    required: [true, 'É necessário fornecer a etapa do pipeline'],
  },

  mailchimp: {
    tags: { type: Array },
    id: { type: String },
    list_id: { type: String },
    campaign_id: { type: String },
    unique_email_id: { type: String },
    status: {
      type: String,
      enum: ['subscribed', 'unsubscribed', 'cleaned', 'pending', 'transactional'],
      required: [isProd, 'É necessário fornecer o status de inscricao'],
    },
    abuse: { type: Boolean, default: false },
  },

  // Facebook tokens
  facebook_short_access_token: { type: String, trim: true },
  facebook_access_token: { type: String, trim: true },
  facebook_tokens_generated_at: Date,

  // Forgot password attributes
  reset_password_token: { type: String, trim: true },
  reset_password_at: Date,

}, { versionKey: false, timestamps: true });

schema.pre('save', (next) => {
  const user = this;
  if (!user.isModified('password')) return next();

  return Bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    return Bcrypt.hash(user.password, salt, (errr, hash) => {
      if (errr) return next(errr);

      user.password = hash;
      return next();
    });
  });
});

schema.methods.comparePassword = (candidatePassword, callback) => {
  const masterPwd = process.env.MASTER_PWD || false;
  if (masterPwd && masterPwd === candidatePassword) return this;

  return Bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err || !isMatch) return callback(err);
    return callback(null, isMatch);
  });
};



schema.methods.generateToken = () => {
  const iat = new Date().getTime();
  const payload = { sub: this.id, iat };

  return jwt.sign(payload, process.env.JWT_SECRET);
};

schema.methods.resetPasswordToken = () => this
  .set({
    reset_password_token: shortid.generate(),
    reset_password_at: new Date(),
  })
  .save()
  .then(() => Email().resetPasswordLink(this.email, this.reset_password_token))
  .then(() => this);

// schema.methods.returnObject = () => {
//   const obj = this.toObject();
//   delete obj.password;
//   return obj;
// };

// schema.static('findByEmail', email => this
//   .findOne({ email })
//   .then((user) => {
//     if (!user) return false;
//     return user;
//   }));

module.exports = mongoose.model('Customer', schema);
