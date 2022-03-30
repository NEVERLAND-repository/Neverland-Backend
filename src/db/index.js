const mongoose = require('mongoose');

exports.connect = (url) =>
  // Mongoose and Server start up
<<<<<<< HEAD
  try {
    mongoose.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`Database connection failed \n ${error}`);
  }
  // eslint-disable-next-line no-console
  console.log('Database connection is successful');
};

module.exports = connect;
=======
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      console.log('database connection successful'));
>>>>>>> c753c2cf92e0a400851ec5c2f8979f40337f6be8
