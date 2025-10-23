import Customer from "../models/Customer.js";

export const customerController = {
  // ➕ Add new customer
  async add(req, res) {
    try {
      console.log(req.body);
      
      const { customer_name, person_name, rate, status } = req.body;

      if (!customer_name || !person_name || !rate) {
        return res.status(400).json({ success: false, message: "Required fields missing" });
      }

      // Check uniqueness
      const existing = await Customer.findOne({ customer_name });
      if (existing) {
        return res.status(400).json({ success: false, message: "Customer name already exists" });
      }
      
      const customer = await Customer.create({ customer_name, person_name, rate, status });
      res.status(201).json({ success: true, data: customer });
    } catch (error) {
      console.error("Error adding customer:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  // 📋 List all customers
  async show(req, res) {
    try {
      const customers = await Customer.find().sort({ createdAt: -1 });
      res.json({ success: true, data: customers });
    } catch (error) {
      console.error("Error fetching customers:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  
  // Toggle customer status
  async toggleStatus(req, res) {
    try {
      const { id } = req.params;
      const customer = await Customer.findById(id);
      if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });

      // Toggle status
      customer.status = customer.status === "active" ? "in_active" : "active";
      await customer.save();

      res.json({ success: true, data: customer });
    } catch (error) {
      console.error("Error toggling status:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
};
