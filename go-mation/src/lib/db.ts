import mongoose from "mongoose";

const mongodburl = process.env.MONGODB_URL;

if (!mongodburl) {
  throw new Error("MONGODB_URL is not defined");
}

let cached = global.mongooseConnection;

if (!cached) {
  cached = global.mongooseConnection = {
    connection: null,
    promise: null,
  };
}

const connectDB = async () => {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongodburl).then((mongoose) => {
      return mongoose.connection;
    });
  }

  try {
    cached.connection = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.connection;
};

export default connectDB;