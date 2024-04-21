require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URL;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Connecting to MongoDB Failed!', err);
  }
};
module.exports = connectDB;
