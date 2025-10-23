import Setting from "../models/Setting.js";

/**
 * Get the current app PIN
 * @route GET /api/settings/pin
 */
export const getPin = async (req, res) => {
  try {
    const pinSetting = await Setting.findOne({ key: "appPin" });
    res.json({ pin: pinSetting ? pinSetting.value : null });
  } catch (err) {
    console.error("Failed to fetch PIN:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Set or update the app PIN
 * @route POST /api/settings/pin
 * @body { pin: string }
 */
export const setPin = async (req, res) => {
  const { pin } = req.body;

  if (!pin || pin.length < 4) {
    return res.status(400).json({ error: "PIN must be at least 4 digits" });
  }

  try {
    // Upsert ensures only one document exists; updates if exists, creates if not
    const updated = await Setting.findOneAndUpdate(
      { key: "appPin" },
      { value: pin },
      { upsert: true, new: true }
    );

    res.json({ success: true, pin: updated.value });
  } catch (err) {
    console.error("Failed to save PIN:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
