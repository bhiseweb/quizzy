'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  question: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  options: [{
      option: {
        type: String,
    default: '',
    trim: true
      }
  }],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  correct_answers: {
    type: [{
      type: Number
    }]
  },
  selected : {
   type:Number,
   default: null
  },
  correct: {
    type:Number,
   default: null
  }
});

mongoose.model('Article', ArticleSchema);
