import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true, // ensures only one document per key
  },
  value: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // optional: adds createdAt & updatedAt

export default mongoose.model("Setting", settingSchema);
