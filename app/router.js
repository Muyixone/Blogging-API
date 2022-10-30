const express = require('express');

const BlogController = require('./controllers/blogpost.controller');

module.exports = (app) => {
  //Routes definitions
  const apiRoutes = express.Router();
  const blogPostRoutes = express.Router();

  //middleware definitions for apiRoutes
  apiRoutes.use('/blogposts', blogPostRoutes);

  //Blog Post Routes/////////////////
  //Post a new blog post
  blogPostRoutes.post('/', BlogController.publishPost);

  //Url for all API Routes
  app.use('/api', apiRoutes);
};
