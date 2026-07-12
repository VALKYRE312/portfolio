import mongoose from 'mongoose';

// Cache the connection for serverless environments
let cachedConnection = null;

export const connectDatabase = async () => {
  // Return cached connection if available
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    
    cachedConnection = conn;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Don't call process.exit() in serverless - just throw error
    throw new Error(`Database connection failed: ${error.message}`);
  }
};
