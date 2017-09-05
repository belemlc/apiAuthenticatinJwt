'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  api_token: { type: String }
});

userSchema.pre('save', function (next) {
  let user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      let error = new Error('Erro ao tentar criar o salt');
      next(error);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        let error = new Error('Erro ao tentar criar o hash');
        next(error);
      }
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', userSchema);
