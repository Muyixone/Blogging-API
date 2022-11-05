const blogService = require('../Services/BlogService');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.status(201).json({
      data: blogs,
      message: 'Success',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.creatBlog = async (req, res) => {
  try {
    const { title, body, tags, author } = req.body;
    //const {id} = req.user
    //const author = `${req.user.firstname} ${req.user.lastname}`;
    const readtime = Math.ceil(body.split(/\s+/).length / 250);
    const readingTime =
      readtime < 1 ? `${readtime + 1} minute read` : `${readtime} minutes read`;

    const blog = await blogService.creatBlog({
      title,
      body,
      tags,
      author,
      read_time: readingTime,
    });
    res.status(201).json({
      blog,
      message: 'Blog Created successfully',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    res.status(201).json({
      blog,
      message: 'Success',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await blogService.updateBlog(req.params.id, req.body);
    res.status(201).json({
      blog,
      message: 'Success',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await blogService.deleteBlog(req.params.id);
    res.status(201).json({
      blog,
      message: 'Blog post deleted successfully',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
