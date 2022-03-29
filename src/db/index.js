const mongoose = require('mongoose');

exports.connect = async (url) =>
  // Mongoose and Server start up
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      console.log('database connected successfully'));
