const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  trending: {
    type: Boolean,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  oldPrice: {
    type: Number,
    required: true
  },
  newPrice: {
    type: Number,
    required: true
  },
  authors: [{  // Changed to an array of references
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: false
  }],
  hardcoverPageCount: {
    type: Number,
    required: false
  },
  publisher: {
    type: String,
    required: false
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
      required: false,
    }
  ],
  quotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quote',
      required: false
    }
  ],
  stock: {
    type: Number,
    min: 1,
    max: 150,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: false
  },
  relatedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: false
    }
  ]
}, {
  timestamps: true
}
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
