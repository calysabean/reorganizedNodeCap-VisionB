'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const goalPostSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: String, required: true },
    comments: { type: String, required: true }
  });
  
  goalPostSchema.methods.serialize = function() {
    return {
      //id: this._id,
      category: this.category,
      comments: this.comments
    };
  };
  
  const GoalPost = mongoose.model('GoalPost', goalPostSchema);
  
  module.exports = { GoalPost};