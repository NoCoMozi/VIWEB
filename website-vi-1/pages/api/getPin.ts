import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/db";
import Pin from "../../models/Pin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const now = new Date();
  const expirationTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const threshold = new Date(now.getTime() - expirationTime);

  try {
    // Remove pins older than 24 hours
    await Pin.deleteMany({ createdAt: { $lt: threshold } });

    // Fetch all pins
    const pins = await Pin.find({});
    res.status(200).json({ success: true, pins });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching pins", error });
  }
}
