'use strict';
const mongoose = require('mongoose');

const goalPostSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: String, required: true },
    comments: { type: String, required: true }
  });
  
  goalPostSchema.methods.serialize = function() {
    return {
      id: this._id,
      category: this.category,
      comments: this.comments
    };
  };

  module.exports = mongoose.model('GoalPost', goalPostSchema);

