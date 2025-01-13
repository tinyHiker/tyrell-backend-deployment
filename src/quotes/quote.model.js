const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  personOrOrganization: {
    type: String,
    required: true
  },
  bookTitle : {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;