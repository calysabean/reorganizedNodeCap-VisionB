'use strict';
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  local   : {
    email: String,
    password: String
  },
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);