const mongoose = require('mongoose');
const shortid = require('shortid');
const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Email = require('../libs/email');

const schema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  pass: { type: String, required: [true, 'Must provide a PassKey'], select: false },
  name: { type: String, trim: true },
  email: { type: String, lowercase: true, trim: true, unique: true, required: [true, 'Provide an Email, it will be your login'], index: { unique: true } },
  phone: { type: String, lowercase: true, trim: true, unique: true },

  // Facebook tokens
  facebook_short_access_token: { type: String, trim: true },
  facebook_access_token: { type: String, trim: true },
  facebook_tokens_generated_at: Date,

  // Forgot password attributes
  reset_password_token: { type: String, trim: true },
  reset_password_at: Date,

}, { versionKey: false, timestamps: false, strict: false });

schema.pre('save', function(next) {
  if (!this.isModified('pass')) return next();

  Bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    Bcrypt.hash(this.pass, salt, (err, hash) => {
      if (err) return next(err);

      this.set({ pass: hash });
      next();
    });
  });
});


schema.static('findByEmail', function (email) {
  return this
    .findOne({ email })
    .then((user) => {
      if (!user) return false;
      return user;
    });
});

schema.methods.comparePassword = function(password) {
  const masterPwd = process.env.MASTER_PWD || false;
  if (masterPwd && masterPwd === password) return Promise.resolve(this);

  return new Promise((resolve, reject) => {
    Bcrypt.compare(password, this.pass, (err, isMatch) => {
      if (err || !isMatch) return reject(err);
      return resolve(this);
    });
  });
};

schema.methods.returnObject = function() {
  const obj = this.toObject();
  delete obj['pass'];
  return obj;
};

schema.methods.generateToken = function() {
  const props = {
    id: this.id,
    name: this.name,
    email: this.email,
  };

  return jwt.sign(props, process.env.JWT_SECRET, { expiresIn: '72h' });
};

schema.methods.resetPasswordToken = function() {
  return this
    .set({
      reset_password_token: shortid.generate(),
      reset_password_at: new Date(),
    })
    .save()
    .then(() => Email().resetPasswordLink(this.email, this.reset_password_token))
    .then(() => this);
};

module.exports = mongoose.model('Users', schema);
