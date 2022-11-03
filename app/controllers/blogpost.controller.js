const blogService = require('../Services/BlogService');

exports.getAllBlogs = async (rerq, res) => {
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

exports.createBlog = async (req, res) => {
  try {
    const blog = await blogService.createBlog(req.body);
    console.log(blog);
    res.status(201).json({
      data: blog,
      message: 'Success creating blog',
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

//Create a new blog post
// exports.publishPost = async (req, res) => {
//   const NewBlogPost = await new BlogPost(req.body);

//   NewBlogPost.save((err, blogPost) => {
//     if (err) {
//       return res.status(422).json({
//         message: 'Server encountered an error publishing blog post',
//         err: err,
//       });
//     } else {
//       return res.status(201).json({
//         message: 'Successfully published blog post',
//         blogPost,
//       });
//     }
//   });
// };
