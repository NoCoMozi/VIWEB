import { getCollectionData } from "../../utils/db"; // Importing the function

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Get data from the 'mission' collection
      const missionData = await getCollectionData("mission");

      // If mission data exists, return it as JSON
      if (missionData && missionData.length > 0) {
        res.status(200).json(missionData);
      } else {
        res.status(404).json({ message: "No missions found" });
      }
    } catch (error) {
      console.error("Error fetching mission data:", error);
      res.status(500).json({ message: "Failed to fetch mission data" });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ message: "Method not allowed!" });
  }
}
