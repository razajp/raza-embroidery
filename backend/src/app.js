import express from "express";
import cors from "cors";
import customerRoutes from "./routes/customerRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";
import validationRoutes from "./routes/validationRoutes.js";

const app = express();

// Enable CORS specifically for your frontend dev server
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/settings", settingRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/validate", validationRoutes);

app.get("/", (req, res) => {
  res.send("RAZA Embroidery Backend is Live ✅");
});

export default app;
