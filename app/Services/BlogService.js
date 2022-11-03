const BlogModel = require('../models/blogpost.model');

exports.getAllBlogs = async () => {
  return await BlogModel.find();
};

exports.creatBlog = async (blog) => {
  return await BlogModel.create(blog);
};

exports.getBlogById = async (id) => {
  return await BlogModel.findById(id);
};

exports.updateBlog = async (id, blog) => {
  return await BlogModel.findByIdAndUpdate(id, blog);
};

exports.deleteBlog = async (id) => {
  return await BlogModel.findByIdAndDelete(id);
};
