require('dotenv').config();

const config = {
  port: process.env.PORT || 3500,
  db: 'mongodb+srv://Muyi:Emwins@cluster0.je3dfkc.mongodb.net/blogpost?retryWrites=true&w=majority',
  test_port: 4242,
  test_db:
    'mongodb+srv://Muyi:Emwins@cluster0.je3dfkc.mongodb.net/test_blogpost?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = config;
