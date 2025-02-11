import { getCollectionData } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch data from the "mission" collection
      const missions = await getCollectionData("mission");

      // Return the data as JSON
      res.status(200).json(missions);
    } catch (error) {
      console.error("Error fetching mission data:", error);
      res.status(500).json({ message: "Failed to fetch mission data" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}
