import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/spotify', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    if (error.name === 'MongoNetworkError') {
      console.error('Network error: Please check your internet connection and MongoDB server status.');
    } else if (error.name === 'MongoParseError') {
      console.error('Parse error: Please check your MongoDB URI format.');
    }
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected! Attempting to reconnect...');
  connectDB();
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected!');
});

export default connectDB;
