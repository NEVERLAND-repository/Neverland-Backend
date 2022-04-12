const dotenv = require('dotenv');
const { User, Book, UserBook } = require('../models');
const connect = require('../db');

dotenv.config();

const DB = process.env.MONGODB_URL;

connect(DB);
// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Book.deleteMany();
    await UserBook.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  console.log('hey');
  // importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
