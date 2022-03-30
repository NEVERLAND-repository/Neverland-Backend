const mongoose = require('mongoose');

exports.connect = (url) =>
  // Mongoose and Server start up
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      console.log('database connection successful'));
