import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/db";
import Pin from "../../models/Pin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await dbConnect();

    const { lat, lng } = req.body;

    try {
      const pin = new Pin({ lat, lng });
      await pin.save();
      res.status(200).json({ success: true, message: "Pin saved" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error saving pin", error });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
