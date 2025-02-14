import mongoose from "mongoose";
///THIS IS NOT MOONGOOSE BUT WORKS TOO
// // Function to connect to the database
// export const connectToDatabase = async () => {
//   if (mongoose.connections[0].readyState) {
//     // Already connected
//     return;
//   }

//   try {
//     // Connect to MongoDB using Mongoose
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useUnifiedTopology: true,
//     });

//     console.log("Connected to MongoDB!");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw new Error("Failed to connect to MongoDB");
//   }
// };

// // Function to get the database (using the cached connection)
// export const getDatabase = () => {
//   if (!cachedDb) {
//     throw new Error(
//       "Database not connected yet. Please call connectToDatabase first."
//     );
//   }
//   return cachedDb;
// };

// Cache the Mongoose connection to avoid multiple connections in a single request
let cachedDb = null;

// Connect to MongoDB using Mongoose
export const connectToDatabase = async () => {
  if (cachedDb) {
    return cachedDb; // Return cached connection
  }

  try {
    // Establish Mongoose connection
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log("Successfully connected to MongoDB!");

    // Cache the database connection to reuse in the future
    cachedDb = mongoose.connection;
    return cachedDb;
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

// New function to list all collections in the database using Mongoose
export const getAllCollections = async () => {
  try {
    const db = await connectToDatabase();

    // List all collections using the Mongoose connection
    const collections = await db.db.listCollections().toArray(); // db.db is the native MongoDB database object
    return collections.map((collection) => collection.name); // Returns just collection names
  } catch (error) {
    console.error("Error getting collections:", error);
    throw new Error("Failed to get collections");
  }
};

// Fetch data from a specific collection using Mongoose
export const getCollectionData = async (collectionName) => {
  try {
    const db = await connectToDatabase();

    // Use the Mongoose connection to get the collection
    const collection = db.collection(collectionName);

    // Fetch all documents from the collection
    const data = await collection.find({}).toArray();

    return data;
  } catch (error) {
    console.error("Error fetching collection data:", error);
    throw new Error("Failed to fetch collection data");
  }
};
