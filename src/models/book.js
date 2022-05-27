const mongoose = require('mongoose');
const mongooseFuzzySearching = require('mongoose-fuzzy-searching');

const BookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [1, 'Book name can not be less than 1 character'],
      trim: true,
      required: [true, 'Book name must be provided'],
    },
    author: {
      type: String,
      minlength: [1, 'Author name can not be less than 1 character'],
      trim: true,
      required: [true, 'Author name must be provided'],
    },
    description: {
      type: String,
      minlength: [1, 'Book description can not be less than 1 character'],
      trim: true,
      required: [true, 'Book description must be provided'],
    },
    content: {
      type: String,
      minlength: [1, 'Book content URL can not be less than 1 character'],
      trim: true,
      required: [true, 'Book content URL must be provided'],
    },
    pageTotal: {
      type: Number,
      default: 0,
    },
    bookImg: {
      type: String,
      minlength: [1, 'Book image URL can not be less than 1 character'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['comics', 'manga', 'novels'],
      minlength: [1, 'Book category can not be less than 1 character'],
      trim: true,
      required: [true, 'Book category must be provided'],
    },
    tags: {
      type: [String],
      minlength: [1, 'Book tag can not be less than 1 character'],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

BookSchema.plugin(mongooseFuzzySearching, {
  fields: ['name', 'author'],
});

module.exports = mongoose.model('Book', BookSchema);
