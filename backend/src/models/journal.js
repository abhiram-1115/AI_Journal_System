import mongoose from "mongoose";

const JournalSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  ambience: {
    type: String,
    enum: ["forest", "ocean", "mountain"],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  emotion: String,
  keywords: [String],
  summary: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Journal", JournalSchema);