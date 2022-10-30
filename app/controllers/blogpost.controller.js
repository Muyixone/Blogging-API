const BlogPost = require('../models/blogpost.model');

//Create a new blog post
exports.publishPost = async (req, res) => {
  const NewBlogPost = await new BlogPost(req.body);

  NewBlogPost.save((err, BlogPost) => {
    if (err) {
      return res
        .status(422)
        .json({
          message: 'Server encountered an error publishing blog post',
          err: err,
        });
    } else {
      return res
        .status(201)
        .json({ message: 'Successfully published blog post', BlogPost });
    }
  });
};
