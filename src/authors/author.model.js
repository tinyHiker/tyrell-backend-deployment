const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  genres: [{
    type: String,
    required: true
  }],
  website: {
    type: String,
    required: false
  },
  socialMediaLinks: {
    twitter: { type: String, required: false },
    facebook: { type: String, required: false },
    instagram: { type: String, required: false }
  }
}, {
  timestamps: true
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;