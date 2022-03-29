const dotenv = require('dotenv');
const path = require('path');
const app = require('./app');
const { connect } = require('./db');

// configure dotenv and port
dotenv.config({ path: path.join(__dirname, '/.env') });
const port = process.env.PORT || 8800;
const DB = process.env.MONGODB_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

const start = async (_port, _url, _app) => {
  try {
    await connect(_url);
    _app.listen(_port, () =>
      console.log(`Server is running on Port: ${_port}`));
  } catch (error) {
    console.log(error);
  }
};

start(port, DB, app);
