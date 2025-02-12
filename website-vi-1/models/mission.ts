import mongoose from "mongoose";

// Define the schema for the Mission model
const MissionSchema = new mongoose.Schema({
  heading: { type: String, required: true },
});

const Mission =
  mongoose.models.Mission || mongoose.model("Mission", MissionSchema);

export default Mission;
