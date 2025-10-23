import mongoose from "mongoose";

function getModelName(collection) {
  if (!collection) return null;

  // 1. Convert plural to singular (basic rule: remove trailing 's' if exists)
  let singular = collection;
  if (collection.endsWith("ies")) {
    // e.g., "companies" -> "company"
    singular = collection.slice(0, -3) + "y";
  } else if (collection.endsWith("s")) {
    singular = collection.slice(0, -1);
  }

  // 2. Capitalize first letter → PascalCase
  return singular.charAt(0).toUpperCase() + singular.slice(1);
}


export const validationController = {
  async checkUnique(req, res) {
    try {
      const { collection, field } = req.params;
      const { value } = req.query;

      if (!collection || !field || !value) {
        return res.status(400).json({ success: false, message: "Missing parameters" });
      }

      const modelName = getModelName(collection); 

      // Dynamically get Mongoose model by collection name
      const Model = mongoose.model(modelName);
      if (!Model) {
        return res.status(404).json({ success: false, message: "Collection not found" });
      }

      const exists = await Model.exists({ [field]: value });
      res.json({ success: true, unique: !exists });
    } catch (error) {
      console.error("Unique check failed:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
};
