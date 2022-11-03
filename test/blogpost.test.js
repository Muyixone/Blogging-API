process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const supertest = require('supertest');

const BlogPost = require('../app/models/blogpost.model');
const BlogPostController = require('../app/controllers/blogpost.controller');
const server = require('../server');
const config = require('../app/config');

const blogURL = 'api/blogposts';

// Connecting to the DB before each test
// beforeEach(() => {
//   const testDb = mongoose.connect(config.test_db);
// });

// // Closing the DB connection after each test
// afterEach(() => {
//   mongoose.connection.close();
// });
describe('Blog Posts', () => {
  beforeEach(() => {
    BlogPost.deleteOne({}, (err) => {
      if (err) console.error(err);
    });
  });
  describe('/POST/ - publish a blog post', () => {
    it('it should POST a new BlogPost', async () => {
      const postblog = {
        url: "muyi's-blog-post",
        title: 'My Journey into tech',
        body: 'Just some random content. lorem ipsum dolor sit amet',
        tags: ['blog', 'nodejs', 'api'],
      };

      const response = await supertest(server).post('/').send(postblog);

      expect(response.status).toBe(201);
    });
  });
});
