const mongoose = require('mongoose');

const connect = (url) => {
  // Mongoose and Server start up
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
