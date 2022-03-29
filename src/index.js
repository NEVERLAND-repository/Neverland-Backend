const dotenv = require('dotenv');
const app = require('./app');
const { connect } = require('./db');

// configure dotenv and port
dotenv.config();
const port = process.env.PORT || 8800;

const start = async (_port, _url, _app) => {
  await connect(_url);
  _app.listen(_port, () => console.log(`Server is running on Port: ${_port}`));
};

start(port, process.env.MONGODB_URL, app);
