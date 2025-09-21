import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
    status: { type: String, enum: ["Pending", "In Progress", "Resolved"], default: "Pending" },
    location: {
      lat: Number,
      lng: Number,
      address: String
    },
    images: [String],
    reportedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("Issue", issueSchema);