import { MongoClient } from "mongodb";

// MongoDB URI from environment variables
const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let cachedClient = null;
let cachedDb = null;

// Function to connect to the database and return the client
export const connectToDatabase = async () => {
  if (cachedClient && cachedDb) {
    // If the client and db are already cached, return them
    return { client: cachedClient, db: cachedDb };
  }

  try {
    // Connect to MongoDB
    const connection = await client.connect();
    const db = connection.db(); // Get the database (specified in the URI)

    // Cache the client and db for future reuse
    cachedClient = connection;
    cachedDb = db;

    console.log("Connected to database!");
    return { client: cachedClient, db: cachedDb };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

// Function to get the database (using the cached connection)
export const getDatabase = () => {
  if (!cachedDb) {
    throw new Error(
      "Database not connected yet. Please call connectToDatabase first."
    );
  }
  return cachedDb;
};

// New function to list all collections in the database
export const getAllCollections = async () => {
  try {
    const { db } = await connectToDatabase();
    const collections = await db.listCollections().toArray(); // Lists all collections
    return collections.map((collection) => collection.name); // Returns just collection names
  } catch (error) {
    console.error("Error getting collections:", error);
    throw new Error("Failed to get collections");
  }
};

export const getCollectionData = async (collectionName) => {
  try {
    const { db } = await connectToDatabase();

    // Get the specific collection
    const collection = db.collection(collectionName);

    // Fetch all documents from the collection
    const data = await collection.find({}).toArray();

    return data;
  } catch (error) {
    console.error("Error fetching collection data:", error);
    throw new Error("Failed to fetch collection data");
  }
};
