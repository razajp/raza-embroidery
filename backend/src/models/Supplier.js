import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    supplier_name: { type: String, required: true, unique: true },
    phone_no: { type: String },
    status: { type: String, enum: ["active", "in_active"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Supplier", supplierSchema);
