const mongoose = require('mongoose');
const shortid = require('shortid');
const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Email = require('../libs/email');

const pipelines = ['joined', 'contacted', 'pending', 'processing', 'completed'];
exports.pipelines = pipelines;

const schema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  pass: { type: String, required: [false, 'Must provide a PassKey'], select: false },
  name: { type: String, trim: true },
  email: { type: String, lowercase: true, trim: true, unique: true },
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
    enum: pipelines,
    required: [true, 'É necessário fornecer o status de inscricao'],
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
      required: [true, 'É necessário fornecer o status de inscricao'],
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

schema.pre('save', function save(next) {
  if (!this.isModified('pass')) return next();

  return Bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    return Bcrypt.hash(this.pass, salt, (err, hash) => {
      if (err) return next(err);

      this.set({ pass: hash });
      next();
    });
  });
});


schema.static('findByEmail', function findByEmail(email) {
  return this
    .findOne({ email })
    .then((user) => {
      if (!user) return false;
      return user;
    });
});

schema.methods.comparePassword = function comparePassword(password) {
  const masterPwd = process.env.MASTER_PWD || false;
  if (masterPwd && masterPwd === password) return Promise.resolve(this);

  return new Promise((resolve, reject) => {
    Bcrypt.compare(password, this.pass, (err, isMatch) => {
      if (err || !isMatch) return reject(err);
      return resolve(this);
    });
  });
};

schema.methods.returnObject = function returnObject() {
  const obj = this.toObject();
  delete obj['pass'];
  return obj;
};

schema.methods.generateToken = function generateToken() {
  const props = {
    id: this.id,
    name: this.name,
    email: this.email,
  };

  return jwt.sign(props, process.env.JWT_SECRET, { expiresIn: '72h' });
};

schema.methods.resetPasswordToken = function resetPasswordToken() {
  return this
    .set({
      reset_password_token: shortid.generate(),
      reset_password_at: new Date(),
    })
    .save()
    .then(() => Email().resetPasswordLink(this.email, this.reset_password_token))
    .then(() => this);
};

module.exports = mongoose.model('Customer', schema);
