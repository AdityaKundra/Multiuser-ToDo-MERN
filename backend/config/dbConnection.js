const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', true);
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/beProjectTodo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
