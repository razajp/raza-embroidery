import Supplier from "../models/Supplier.js";

export const supplierController = {
  // ➕ Add new supplier
  async add(req, res) {
    try {
      console.log(req.body);
      
      const { supplier_name, phone_no, status } = req.body;

      if (!supplier_name) {
        return res.status(400).json({ success: false, message: "Required fields missing" });
      }

      // Check uniqueness
      const existing = await Supplier.findOne({ supplier_name });
      if (existing) {
        return res.status(400).json({ success: false, message: "Supplier name already exists" });
      }
      
      const supplier = await Supplier.create({ supplier_name, phone_no, status });
      res.status(201).json({ success: true, data: supplier });
    } catch (error) {
      console.error("Error adding supplier:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  // 📋 List all suppliers
  async show(req, res) {
    try {
      const suppliers = await Supplier.find().sort({ createdAt: -1 });
      res.json({ success: true, data: suppliers });
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  
  // Toggle supplier status
  async toggleStatus(req, res) {
    try {
      const { id } = req.params;
      const supplier = await Supplier.findById(id);
      if (!supplier) return res.status(404).json({ success: false, message: "Supplier not found" });

      // Toggle status
      supplier.status = supplier.status === "active" ? "in_active" : "active";
      await supplier.save();

      res.json({ success: true, data: supplier });
    } catch (error) {
      console.error("Error toggling status:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
};
