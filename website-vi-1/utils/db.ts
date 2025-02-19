import mongoose from "mongoose";

let cachedDb: mongoose.Connection | null = null;

export const connectToDatabase = async (): Promise<mongoose.Connection> => {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Successfully connected to MongoDB!");

    cachedDb = mongoose.connection;
    console.log("Connected to MongoDB:", mongoose.connection.readyState === 1);
    return cachedDb;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export const getAllCollections = async () => {
  try {
    const db = await connectToDatabase();

    const collections = await db.db.listCollections().toArray();
    return collections.map((collection) => collection.name);
  } catch (error) {
    console.error("Error getting collections:", error);
    throw new Error("Failed to get collections");
  }
};

export const getCollectionData = async (collectionName: string) => {
  try {
    const db = await connectToDatabase();

    // Use Mongoose's native connection to fetch data
    const collection = db.db.collection(collectionName);
    const data = await collection.find({}).toArray();
    return data;
  } catch (error) {
    console.error("Error fetching collection data:", error);
    throw new Error("Failed to fetch collection data");
  }
};
