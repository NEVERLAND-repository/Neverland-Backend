require('dotenv').config();

const connectDB = require('./db');
const { Book } = require('./models');

const jsonProducts = require('./books.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await Book.create(jsonProducts);
    console.log('Database population is successful');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
