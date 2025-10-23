import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    customer_name: { type: String, required: true, unique: true },
    person_name: { type: String, required: true },
    rate: { type: Number },
    status: { type: String, enum: ["active", "in_active"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
