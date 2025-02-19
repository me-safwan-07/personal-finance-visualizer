import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Define a global type for caching the connection
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Use a global variable to prevent multiple connections
const globalCache = global as unknown as { mongoose?: MongooseCache };

if (!globalCache.mongoose) {
  globalCache.mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
  if (globalCache.mongoose?.conn) return globalCache.mongoose.conn;

  if (!globalCache.mongoose?.promise) {
    (globalCache.mongoose as MongooseCache).promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "finance",
        bufferCommands: false,
      })
      .then((m) => m.connection);
  }

    globalCache.mongoose!.conn = await globalCache.mongoose!.promise;
    return globalCache.mongoose!.conn;
  }
