const dotenv = require('dotenv');
const path = require('path');
const app = require('./app');
const { connect } = require('./db');
const asyncHandler = require('express-async-handler')

// configure dotenv and port
dotenv.config({ path: path.join(__dirname, '/.env') });
const port = process.env.PORT || 8800;
const DB = process.env.MONGODB_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

const start = asyncHandler(async (_port, _url, _app) => {
  try {
    await connect(_url);
    _app.listen(_port, () =>
      console.log(`Server is running on Port: ${_port}`));
  } catch (error) {
    console.log(error);
  }
});

// unhandled rejection
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 🎇 Shutting down');
  app.close(() => {
    process.exit(1);
  });
});

start(port, DB, app);
