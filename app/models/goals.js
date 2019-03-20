'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var goalSchema = mongoose.Schema({
  category: 'string',
  goal: 'string'
});

goalSchema.methods.serialize = function() {
  return {
    id: this._id,
    category: this.category,
    goal: this.goal
  };
};
 
  const Goal = mongoose.model('Goal', goalSchema, );
  
  module.exports = { Goal};