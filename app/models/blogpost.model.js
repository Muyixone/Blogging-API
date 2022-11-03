const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//BlogPost schema
const BlogPostSchema = mongoose.Schema(
  {
    url: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Draft',
    },
    read_count: {
      type: Number,
    },
    reading_time: {
      type: Number,
    },
    tags: [String],
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('BlogPost', BlogPostSchema);
