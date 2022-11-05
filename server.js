const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const config = require('./app/config');
const Blogroute = require('./app/routes/blogroutes');
const userRoutes = require('./app/routes/user_route');

require('dotenv').config();
var jwt = require('jsonwebtoken');
const app = express();

app.set('secretKey', config.JWT_SECRET);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ hey: 'Welcome to my blog!' });
});

//public route
app.use('/users', userRoutes);

app.use('/api/blogs', Blogroute);

// function validateUser(req, res, next) {
//   jwt.verify(
//     req.headers['x-access-token'],
//     req.app.get('secretKey'),
//     function (err, decoded) {
//       if (err) {
//         res.json({ status: 'error', message: err.message, data: null });
//       } else {
//         // Add user id to request
//         req.body.userId = decoded.id;
//         next();
//       }
//     }
//   );
// }

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
      console.log(`connected to DB`);
    });
  });
}

module.exports = app;
