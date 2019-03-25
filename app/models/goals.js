'use strict';

const mongoose = require('mongoose');

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

  module.exports = mongoose.model('Goal', goalSchema);