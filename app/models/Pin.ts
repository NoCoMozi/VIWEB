import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const PinSchema = new mongoose.Schema({
  _id: ObjectId,
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now, expires: 86400 },
});

export default mongoose.models.Pin || mongoose.model("Pin", PinSchema);
