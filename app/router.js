const express = require('express');

const {
  getAllBlogs,
  creatBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('./controllers/blogpost.controller');

const router = express.Router();

router.route('/').get(getAllBlogs).post(creatBlog);
router.route('/:id').get(getBlogById).put(updateBlog).delete(deleteBlog);

module.exports = router;
