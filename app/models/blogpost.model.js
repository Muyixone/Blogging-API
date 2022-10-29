const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//BlogPost schema
const BlogPostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
  },
  state: {},
  read_count,
  reading_time,
  tags: [String],
  body: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
  },
});
