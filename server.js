const express = require('express');
const mongoose = require('mongoose');

const config = require('./app/config');

const app = express();

app.set('port', config.port);

app.listen(app.get('port'), (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server is listening on port ${app.get('port')}...`);
});
