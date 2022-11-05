const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const config = require('./app/config');
const Blogroute = require('./app/routes/blogroutes');
const userRoutes = require('./app/routes/user_route');

require('dotenv').config();
require('./app/controllers/user.controller');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', userRoutes);
app.use(
  '/api/blogs',
  passport.authenticate('jwt', { session: false }),
  Blogroute
);

if (process.env.NODE_ENV === 'test') {
  app.set('port', config.test_port);
  app.listen(app.get('port'), (err) => {
    if (err) console.error(err);
    console.log(`Server is listening on port ${config.test_port}`);
    const db = mongoose.connect(config.test_db);
  });
} else {
  app.set('port', config.port);
  app.listen(app.get('port'), (err) => {
    if (err) console.error(err);
    console.log(`Server is listening on port ${app.get('port')}...`);
    const db = mongoose.connect(config.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on('connected', () => {
      console.log(`Mongoose connected to ${config.db}`);
    });
  });
}

module.exports = app;
